// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthContextType {
    user: User | null;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

interface User {
    id: string;
    email: string;
    name: string;
}

interface LoginData {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for token in cookies and set user if token exists
        const token = Cookies.get('token');
        if (token) {
            // Optionally make an API call to fetch the user profile using the token
            fetchUserProfile(token);
        }
    }, []);

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await axios.get(import.meta.env.VITE_PROFILE_API, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };

    const login = async (data: LoginData) => {
        try {
            console.log("data", data);
            const response = await axios.post(import.meta.env.VITE_LOGIN_API, data);
            const { token, user } = response.data;
            setUser(user);
            Cookies.set('token', token, { expires: 7 }); // Set token in cookies for 7 days
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token'); // Remove token from cookies
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
