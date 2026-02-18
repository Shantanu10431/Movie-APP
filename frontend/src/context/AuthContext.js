"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for cookies
    });

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.data);
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                setUser(res.data.data);
                localStorage.setItem('token', res.data.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                router.push('/home');
                return { success: true };
            }
            return { success: false, error: res.data.error };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Login failed' };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await api.post('/auth/register', { name, email, password });
            if (res.data.success) {
                setUser(res.data.data);
                localStorage.setItem('token', res.data.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                router.push('/home');
                return { success: true };
            }
            return { success: false, error: res.data.error };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Signup failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, api }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
