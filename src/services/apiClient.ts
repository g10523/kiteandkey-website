import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// ─── Constants ───

const TOKEN_KEY = 'kite_access_token';
const USER_KEY = 'kite_user';
const PROACTIVE_REFRESH_BUFFER_SECONDS = 120; // Refresh 2 minutes before expiry

// ─── Axios Instance ───

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true, // For httpOnly refresh token cookies
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// ─── Token Utilities ───

/**
 * Parse JWT payload without verification (client-side only for scheduling)
 */
function parseJwtPayload(token: string): { exp: number; id: string; role: string } | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch {
        return null;
    }
}

/**
 * Get seconds until token expiry
 */
function getSecondsUntilExpiry(token: string): number {
    const payload = parseJwtPayload(token);
    if (!payload?.exp) return 0;
    return payload.exp - Math.floor(Date.now() / 1000);
}

/**
 * Check if token needs proactive refresh
 */
function shouldRefreshProactively(token: string): boolean {
    const secondsLeft = getSecondsUntilExpiry(token);
    return secondsLeft > 0 && secondsLeft <= PROACTIVE_REFRESH_BUFFER_SECONDS;
}

/**
 * Check if token is expired
 */
function isTokenExpired(token: string): boolean {
    return getSecondsUntilExpiry(token) <= 0;
}

// ─── Proactive Refresh Scheduler ───

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Schedule a proactive token refresh before expiry
 */
export function scheduleTokenRefresh(token: string): void {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }

    const secondsLeft = getSecondsUntilExpiry(token);
    if (secondsLeft <= 0) return;

    const refreshIn = Math.max(
        (secondsLeft - PROACTIVE_REFRESH_BUFFER_SECONDS) * 1000,
        1000 // At least 1 second from now
    );

    refreshTimer = setTimeout(async () => {
        try {
            await performTokenRefresh();
        } catch (error) {
            console.warn('[ApiClient] Proactive token refresh failed:', error);
        }
    }, refreshIn);
}

/**
 * Perform the actual token refresh
 */
async function performTokenRefresh(): Promise<string> {
    // Deduplicate concurrent refresh attempts
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const { data } = await axios.post(
                `${apiClient.defaults.baseURL}/auth/refresh`,
                {},
                { withCredentials: true, timeout: 10000 }
            );

            const newToken = data.accessToken;
            localStorage.setItem(TOKEN_KEY, newToken);

            // Schedule the next proactive refresh
            scheduleTokenRefresh(newToken);

            return newToken;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/**
 * Clear auth state and redirect to login
 */
export function forceLogout(): void {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Avoid redirect loop
    if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
    }
}

// ─── Request Interceptor ───

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            // If token is about to expire, proactively refresh before sending
            if (shouldRefreshProactively(token) || isTokenExpired(token)) {
                try {
                    token = await performTokenRefresh();
                } catch {
                    // Will be caught by response interceptor if truly expired
                }
            }

            if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ───

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If 401 and we haven't retried yet, attempt refresh
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await performTokenRefresh();

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                // Retry original request with new token
                return apiClient(originalRequest);
            } catch {
                // Refresh failed — force logout
                forceLogout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

// ─── Exported Helpers ───

export const TOKEN_STORAGE_KEY = TOKEN_KEY;
export const USER_STORAGE_KEY = USER_KEY;

export default apiClient;
