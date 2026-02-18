"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { moviesApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, Play, Info } from 'lucide-react';

const IMAGE_ORIGINAL_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_ORIGINAL || 'https://image.tmdb.org/t/p/original';

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [bannerMovie, setBannerMovie] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingRes, popularRes] = await Promise.all([
                    moviesApi.getTrending(),
                    moviesApi.getPopular(),
                ]);
                setTrending(trendingRes.data.data);
                setPopular(popularRes.data.data);

                // Set random banner movie
                const random = Math.floor(Math.random() * trendingRes.data.data.length - 1);
                setBannerMovie(trendingRes.data.data[random]);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                setDataLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading || dataLoading) {
        return <div className="min-h-screen bg-[#0f1014] flex items-center justify-center"><Loader2 className="animate-spin text-red-600 w-10 h-10" /></div>;
    }

    return (
        <div className="min-h-screen bg-[#0f1014] pb-20">
            <Navbar />

            {/* Hero Banner */}
            {bannerMovie && (
                <div className="relative h-[80vh] w-full">
                    <div className="absolute inset-0">
                        <img
                            src={`${IMAGE_ORIGINAL_URL}${bannerMovie.backdrop_path}`}
                            alt={bannerMovie.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl text-white space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-xl">{bannerMovie.title}</h1>
                        <p className="text-lg line-clamp-3 text-gray-200 drop-shadow-md max-w-xl">
                            {bannerMovie.overview}
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-opacity-80 transition">
                                <Play className="w-5 h-5 fill-black" /> Play
                            </button>
                            <button className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-3 rounded-md font-bold hover:bg-gray-500/50 transition">
                                <Info className="w-5 h-5" /> More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rows */}
            <div className="px-4 md:px-12 -mt-24 relative z-10 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Trending Now</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {trending.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Popular on MovieNova</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {popular.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
