import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole, RegistrationToken, Student } from '../types';
import { currentStudent, mockTokens } from '../data/mockData';
import apiClient, {
    TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    scheduleTokenRefresh,
    forceLogout,
} from '../services/apiClient';
import { snakeToCamel } from '../services/syncEngine';

// ─── Configuration ───

/**
 * When true, auth routes through the Express backend and PostgreSQL.
 * When false, uses the original mock/localStorage system for offline dev.
 */
const USE_BACKEND_AUTH = import.meta.env.VITE_USE_BACKEND_AUTH === 'true';

// ─── Types ───

interface AuthContextType {
    user: User | null;
    role: UserRole | null;
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
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
        if (USE_BACKEND_AUTH) {
            hydrateFromBackend();
        } else {
            hydrateFromLocalStorage();
        }
    }, []);

    /**
     * Hydrate from backend: look for stored JWT, validate it, restore session
     */
    async function hydrateFromBackend() {
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

    /**
     * Hydrate from localStorage (mock mode)
     */
    function hydrateFromLocalStorage() {
        const savedUser = localStorage.getItem('lms_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const savedTokens = localStorage.getItem('lms_tokens');
        if (savedTokens) {
            const parsed = JSON.parse(savedTokens);
            setTokens(parsed.map((t: any) => ({
                ...t,
                createdAt: new Date(t.createdAt),
                expiresAt: new Date(t.expiresAt)
            })));
        } else {
            setTokens(mockTokens);
            localStorage.setItem('lms_tokens', JSON.stringify(mockTokens));
        }

        setIsLoading(false);
    }

    // ─── Login ───

    const login = useCallback(async (email: string, password: string, role?: UserRole) => {
        setIsLoading(true);

        if (USE_BACKEND_AUTH) {
            try {
                const { data } = await apiClient.post('/auth/login', { email, password });

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
                    throw new Error('Invalid email or password');
                } else if (error.response?.status === 403) {
                    throw new Error('Account has been deactivated');
                } else if (error.code === 'ERR_NETWORK') {
                    throw new Error('Unable to connect to server. Please try again later.');
                } else {
                    throw new Error(error.response?.data?.error || 'Login failed');
                }
            }
        } else {
            // Mock login (original behavior)
            await new Promise(resolve => setTimeout(resolve, 1000));

            const safeRole = role || 'student';
            let mockUser: User;

            if (safeRole === 'student') {
                mockUser = currentStudent;
            } else {
                mockUser = {
                    id: `user-${Math.random().toString(36).substr(2, 9)}`,
                    role: safeRole,
                    firstName: email.split('@')[0],
                    lastName: '',
                    email: email,
                };
            }

            setUser(mockUser);
            localStorage.setItem('lms_user', JSON.stringify(mockUser));
        }

        setIsLoading(false);
    }, []);

    // ─── Register ───

    const register = useCallback(async (userData: any, tokenCode: string): Promise<boolean> => {
        setIsLoading(true);

        if (USE_BACKEND_AUTH) {
            try {
                const { data } = await apiClient.post('/auth/register', {
                    token: tokenCode,
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
        } else {
            // Mock registration (original behavior)
            const isBypass = tokenCode === 'PUBLIC' || tokenCode === 'KITE-BETA-2026';
            const tokenIndex = tokens.findIndex(t => t.code === tokenCode && !t.isUsed && t.role === userData.role);

            if (tokenIndex === -1 && !isBypass) {
                setIsLoading(false);
                alert('Invalid or already used registration token. For public beta, use "KITE-BETA-2026".');
                return false;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: `user-${Math.random().toString(36).substr(2, 9)}`,
                ...userData,
                isVerified: !isBypass,
            };

            if (userData.role === 'student') {
                const studentUser = newUser as Student;
                if (newUser.isVerified) {
                    studentUser.mindPrintProfile = currentStudent.mindPrintProfile;
                    studentUser.enrolledSubjects = ['math-001', 'english-001'];
                } else {
                    studentUser.enrolledSubjects = [];
                }
            }

            if (tokenIndex !== -1) {
                const newTokens = [...tokens];
                newTokens[tokenIndex] = {
                    ...newTokens[tokenIndex],
                    isUsed: true,
                    usedBy: newUser.id,
                };
                setTokens(newTokens);
                localStorage.setItem('lms_tokens', JSON.stringify(newTokens));
            }

            setUser(newUser);
            localStorage.setItem('lms_user', JSON.stringify(newUser));
            setIsLoading(false);
            return true;
        }
    }, [tokens]);

    // ─── Token Management (admin) ───

    const generateToken = useCallback(async (role: UserRole): Promise<RegistrationToken> => {
        if (USE_BACKEND_AUTH) {
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
        } else {
            const prefix = `K&K-${role.toUpperCase()}-`;
            const randomStr = Math.random().toString(36).toUpperCase().substr(2, 6);
            const newToken: RegistrationToken = {
                id: `token-${Math.random().toString(36).substr(2, 9)}`,
                code: `${prefix}${randomStr}`,
                role,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                isUsed: false,
            };

            const updatedTokens = [newToken, ...tokens];
            setTokens(updatedTokens);
            localStorage.setItem('lms_tokens', JSON.stringify(updatedTokens));
            return newToken;
        }
    }, [tokens]);

    const deleteToken = useCallback((tokenId: string) => {
        if (USE_BACKEND_AUTH) {
            apiClient.delete(`/admin/tokens/${tokenId}`).catch(console.error);
        }

        const updatedTokens = tokens.filter(t => t.id !== tokenId);
        setTokens(updatedTokens);
        localStorage.setItem('lms_tokens', JSON.stringify(updatedTokens));
    }, [tokens]);

    // ─── Logout ───

    const logout = useCallback(() => {
        if (USE_BACKEND_AUTH) {
            apiClient.post('/auth/logout').catch(console.error);
            forceLogout();
        }

        setUser(null);
        localStorage.removeItem('lms_user');
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
