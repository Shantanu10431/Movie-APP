"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { favoritesApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const { user, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            favoritesApi.getAll()
                .then(res => setFavorites(res.data.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (authLoading || loading) return <div className="min-h-screen bg-[#0f1014]" />;

    return (
        <div className="min-h-screen bg-[#0f1014]">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>

                <div className="bg-[#181818] p-8 rounded-lg mb-12 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Account Details</h2>
                    <div className="space-y-2 text-gray-300">
                        <p><span className="font-semibold text-white">Name:</span> {user.name}</p>
                        <p><span className="font-semibold text-white">Email:</span> {user.email}</p>
                        <p><span className="font-semibold text-white">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-6">My List ({favorites.length})</h2>
                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {favorites.map(fav => (
                                <MovieCard
                                    key={fav.movieId}
                                    movie={{
                                        id: fav.movieId,
                                        title: fav.title,
                                        poster_path: fav.posterPath
                                    }}
                                    isFavorite={true}
                                    onToggleFavorite={() => {
                                        setFavorites(prev => prev.filter(f => f.movieId !== fav.movieId));
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">You haven't added any movies to your list yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
}
