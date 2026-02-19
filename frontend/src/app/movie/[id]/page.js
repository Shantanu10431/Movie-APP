"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { moviesApi } from '@/services/api';
import { Loader2, Star, Play, Calendar } from 'lucide-react';

const IMAGE_ORIGINAL_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_ORIGINAL || 'https://image.tmdb.org/t/p/original';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            moviesApi.getDetails(id)
                .then(res => setMovie(res.data.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#0f1014] flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;
    if (!movie) return <div className="min-h-screen bg-[#0f1014] text-white flex items-center justify-center">Movie not found</div>;

    return (
        <div className="min-h-screen bg-[#0f1014] text-white">
            <Navbar />

            {/* Backdrop */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#0f1014]" />
                <img
                    src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/1280x720?text=No+Image"}
                    alt={movie.Title}
                    className="w-full h-full object-cover opacity-30 blur-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row gap-12">
                {/* Poster */}
                <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
                    <img
                        src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/500x750?text=No+Image"}
                        alt={movie.Title}
                        className="w-full rounded-lg shadow-2xl"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6 pt-10">
                    <h1 className="text-4xl md:text-5xl font-bold">{movie.Title} <span className="text-gray-400 text-3xl">({movie.Year})</span></h1>

                    <div className="flex items-center gap-6 text-sm text-gray-300 flex-wrap">
                        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {movie.imdbRating}</span>
                        )}
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.Released}</span>
                        <span>{movie.Runtime}</span>
                        <div className="flex gap-2">
                            {movie.Genre?.split(', ').map(g => (
                                <span key={g} className="bg-[#333] px-2 py-1 rounded-sm text-xs">{g}</span>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl">
                        <h3 className="text-xl font-bold mb-2">Overview</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{movie.Plot}</p>
                    </div>

                    {/* Cast */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
                        <div className="text-gray-400 space-y-2">
                            <p><span className="text-white font-bold">Director:</span> {movie.Director}</p>
                            <p><span className="text-white font-bold">Writers:</span> {movie.Writer}</p>
                            <p><span className="text-white font-bold">Actors:</span> {movie.Actors}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
