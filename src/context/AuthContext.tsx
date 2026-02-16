import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole, RegistrationToken, Student } from '../types';
import { currentStudent, mockTokens } from '../data/mockData';

interface AuthContextType {
    user: User | null;
    role: UserRole | null;
    login: (email: string, role: UserRole) => Promise<void>;
    register: (userData: any, tokenCode: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    tokens: RegistrationToken[];
    generateToken: (role: UserRole) => Promise<RegistrationToken>;
    deleteToken: (tokenId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tokens, setTokens] = useState<RegistrationToken[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load initial state
        const savedUser = localStorage.getItem('lms_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const savedTokens = localStorage.getItem('lms_tokens');
        if (savedTokens) {
            const parsed = JSON.parse(savedTokens);
            // Convert strings back to Date objects
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
    }, []);

    const login = async (email: string, role: UserRole) => {
        setIsLoading(true);
        // Mock login logic - in a real app this would call an API
        setTimeout(() => {
            let mockUser: User;

            if (role === 'student') {
                mockUser = currentStudent;
            } else {
                mockUser = {
                    id: `user-${Math.random().toString(36).substr(2, 9)}`,
                    role,
                    firstName: email.split('@')[0],
                    lastName: '',
                    email: email,
                };
            }

            setUser(mockUser);
            localStorage.setItem('lms_user', JSON.stringify(mockUser));
            setIsLoading(false);
        }, 1000);
    };

    const register = async (userData: any, tokenCode: string): Promise<boolean> => {
        setIsLoading(true);

        // Find and validate token
        // ALLOWING 'GUEST' or 'PUBLIC' as temporary bypass tokens for growth phase
        const isBypass = tokenCode === 'PUBLIC' || tokenCode === 'KITE-BETA-2026';
        const tokenIndex = tokens.findIndex(t => t.code === tokenCode && !t.isUsed && t.role === userData.role);

        if (tokenIndex === -1 && !isBypass) {
            setIsLoading(false);
            alert('Invalid or already used registration token. For public beta, use "KITE-BETA-2026".');
            return false;
        }

        // Delay to simulate network
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: `user-${Math.random().toString(36).substr(2, 9)}`,
            ...userData,
            isVerified: !isBypass, // Public signups might need verification later
        };

        // If student, give them a default MindPrint profile so the app doesn't 'cook'
        if (userData.role === 'student' && currentStudent.mindPrintProfile) {
            (newUser as Student).mindPrintProfile = currentStudent.mindPrintProfile;
            (newUser as Student).enrolledSubjects = ['math-001', 'english-001'];
        }

        // Mark token as used
        if (tokenIndex !== -1) {
            const newTokens = [...tokens];
            newTokens[tokenIndex] = {
                ...newTokens[tokenIndex],
                isUsed: true,
                usedBy: newUser.id
            };
            setTokens(newTokens);
            localStorage.setItem('lms_tokens', JSON.stringify(newTokens));
        }

        setUser(newUser);
        localStorage.setItem('lms_user', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
    };

    const generateToken = async (role: UserRole): Promise<RegistrationToken> => {
        const prefix = `K&K-${role.toUpperCase()}-`;
        const randomStr = Math.random().toString(36).toUpperCase().substr(2, 6);
        const newToken: RegistrationToken = {
            id: `token-${Math.random().toString(36).substr(2, 9)}`,
            code: `${prefix}${randomStr}`,
            role,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            isUsed: false
        };

        const updatedTokens = [newToken, ...tokens];
        setTokens(updatedTokens);
        localStorage.setItem('lms_tokens', JSON.stringify(updatedTokens));
        return newToken;
    };

    const deleteToken = (tokenId: string) => {
        const updatedTokens = tokens.filter(t => t.id !== tokenId);
        setTokens(updatedTokens);
        localStorage.setItem('lms_tokens', JSON.stringify(updatedTokens));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('lms_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            role: user?.role || null,
            login,
            register,
            logout,
            isLoading,
            tokens,
            generateToken,
            deleteToken
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
