import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole, RegistrationToken } from '../types';
import apiClient, {
    TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    scheduleTokenRefresh,
    forceLogout,
} from '../services/apiClient';
import { snakeToCamel } from '../services/syncEngine';

// ─── Types ───

interface AuthContextType {
    user: User | null;
    role: UserRole | null;
    login: (username: string, password: string, role?: UserRole) => Promise<void>;
    register: (userData: any, tokenCode: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    isOffline: boolean;
    tokens: RegistrationToken[];
    generateToken: (role: UserRole) => Promise<RegistrationToken>;
    deleteToken: (tokenId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ───

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tokens, setTokens] = useState<RegistrationToken[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    // ─── Hydrate on mount ───

    useEffect(() => {
        hydrateSession();
    }, []);

    /**
     * Hydrate session: look for stored JWT, validate it, restore session.
     * Falls back to cached user data if the server is unreachable (offline mode).
     */
    async function hydrateSession() {
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (storedToken && storedUser) {
            try {
                // Validate token is still good by calling a lightweight endpoint
                const { data } = await apiClient.get('/auth/me');
                const backendUser = snakeToCamel(data.user) as User;

                setUser(backendUser);
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(backendUser));

                // Schedule proactive refresh
                scheduleTokenRefresh(storedToken);
                setIsOffline(false);
            } catch (error: any) {
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
                    // Offline — use cached user
                    try {
                        setUser(JSON.parse(storedUser));
                        setIsOffline(true);
                    } catch {
                        setUser(null);
                    }
                } else {
                    // Token invalid — clean up
                    localStorage.removeItem(TOKEN_STORAGE_KEY);
                    localStorage.removeItem(USER_STORAGE_KEY);
                    setUser(null);
                }
            }
        }
        setIsLoading(false);
    }

    // ─── Login ───

    const login = useCallback(async (username: string, password: string, _role?: UserRole) => {
        setIsLoading(true);

        try {
            const { data } = await apiClient.post('/auth/login', { username, password });

            // Store access token
            localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);

            // Build User object from backend response
            const backendUser: User = {
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                isVerified: data.user.isVerified !== false,
                ...(data.user.mindPrintComplete !== undefined
                    ? { mindPrintComplete: data.user.mindPrintComplete }
                    : {}),
            };

            setUser(backendUser);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(backendUser));
            setIsOffline(false);

            // Schedule proactive token refresh
            scheduleTokenRefresh(data.accessToken);
        } catch (error: any) {
            setIsLoading(false);

            if (error.response?.status === 401) {
                throw new Error('Invalid username or password');
            } else if (error.response?.status === 403) {
                throw new Error('Account has been deactivated');
            } else if (error.code === 'ERR_NETWORK') {
                throw new Error('Unable to connect to server. Please try again later.');
            } else {
                throw new Error(error.response?.data?.error || 'Login failed');
            }
        }

        setIsLoading(false);
    }, []);

    // ─── Register ───

    const register = useCallback(async (userData: any, tokenCode: string): Promise<boolean> => {
        setIsLoading(true);

        try {
            const { data } = await apiClient.post('/auth/register', {
                token: tokenCode,
                username: userData.username,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                dateOfBirth: userData.dateOfBirth,
                gradeLevel: userData.gradeLevel,
            });

            // Store access token
            localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);

            const backendUser: User = {
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                isVerified: true,
            };

            setUser(backendUser);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(backendUser));
            setIsOffline(false);

            scheduleTokenRefresh(data.accessToken);
            setIsLoading(false);
            return true;
        } catch (error: any) {
            setIsLoading(false);
            const message = error.response?.data?.error || 'Registration failed';
            alert(message);
            return false;
        }
    }, []);

    // ─── Token Management (admin) ───

    const generateToken = useCallback(async (role: UserRole): Promise<RegistrationToken> => {
        try {
            const { data } = await apiClient.post('/admin/tokens', {
                role,
                maxUses: 1,
                expiresInDays: 7,
            });

            const newToken: RegistrationToken = {
                id: data.id || `token-${Date.now()}`,
                code: data.tokenCode,
                role: data.role,
                createdAt: new Date(data.createdAt),
                expiresAt: new Date(data.expiresAt),
                isUsed: false,
            };

            setTokens(prev => [newToken, ...prev]);
            return newToken;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to generate token');
        }
    }, []);

    const deleteToken = useCallback((tokenId: string) => {
        apiClient.delete(`/admin/tokens/${tokenId}`).catch(console.error);
        setTokens(prev => prev.filter(t => t.id !== tokenId));
    }, []);

    // ─── Logout ───

    const logout = useCallback(() => {
        apiClient.post('/auth/logout').catch(console.error);
        forceLogout();
        setUser(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
    }, []);

    // ─── Render ───

    return (
        <AuthContext.Provider value={{
            user,
            role: user?.role || null,
            login,
            register,
            logout,
            isLoading,
            isOffline,
            tokens,
            generateToken,
            deleteToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
