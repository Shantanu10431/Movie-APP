"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-[#E50914] tracking-tighter hover:scale-105 transition-transform">
                    MOVIENOVA
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
                        <Search className="w-5 h-5" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                <User className="w-5 h-5" />
                                <span className="hidden md:block text-sm font-medium">{user.name}</span>
                            </Link>
                            <button onClick={logout} className="text-gray-300 hover:text-[#E50914] transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="bg-[#E50914] text-white px-5 py-2 rounded font-medium text-sm hover:bg-[#b00710] transition-colors">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
