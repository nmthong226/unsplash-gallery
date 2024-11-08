// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    userLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    fetchUserProfile: (token: string) => Promise<void>;
    logout: () => void;
}

interface LoginData {
    email: string;
    password: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchUserProfile(token);
        } else 
        {
            setUserLoading(false);
        }
    }, []);
    const fetchUserProfile = async (token: string) => {
        try {
            const response = await axios.get(import.meta.env.VITE_PROFILE_API, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        } finally {
            setUserLoading(false);
        }
    };
    const login = async (data: LoginData) => {
        try {
            const response = await axios.post(import.meta.env.VITE_LOGIN_API, data);
            const { token, user } = response.data;
            setUser(user);
            Cookies.set('token', token, { expires: 7 });
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };
    const logout = () => {
        setUser(null);
        Cookies.remove('token');
    };
    return (
        <AuthContext.Provider value={{ user, userLoading, login, logout, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
