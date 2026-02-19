"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { moviesApi } from '@/services/api';
import { Loader2 } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            moviesApi.search(query)
                .then(res => setMovies(res.data.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [query]);

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="bg-[#333] text-white px-6 py-3 rounded-md w-full max-w-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            window.location.href = `/search?q=${e.target.value}`;
                        }
                    }}
                    defaultValue={query || ''}
                />
            </div>

            {loading ? (
                <div className="flex justify-center"><Loader2 className="animate-spin text-red-600" /></div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-6 text-white">
                        {query ? `Results for "${query}"` : 'Search Movies'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                        {movies.length === 0 && query && (
                            <p className="text-gray-400">No results found.</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-[#0f1014] pb-20">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-red-600" /></div>}>
                    <SearchContent />
                </Suspense>
            </div>
        </div>
    );
}
