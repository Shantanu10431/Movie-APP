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
            <div className="relative h-[70vh] w-full">
                <img
                    src={`${IMAGE_ORIGINAL_URL}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row gap-12">
                {/* Poster */}
                <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
                    <img
                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-2xl"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6 pt-10">
                    <h1 className="text-5xl font-bold">{movie.title} <span className="text-gray-400 text-3xl">({new Date(movie.release_date).getFullYear()})</span></h1>

                    <div className="flex items-center gap-6 text-sm text-gray-300">
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {movie.vote_average.toFixed(1)}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.release_date}</span>
                        <span>{movie.runtime} min</span>
                        <div className="flex gap-2">
                            {movie.genres?.map(g => (
                                <span key={g.id} className="bg-[#333] px-2 py-1 rounded-sm text-xs">{g.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl">
                        <h3 className="text-xl font-bold mb-2">Overview</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                    </div>

                    {/* Cast */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Top Cast</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {movie.credits?.cast?.slice(0, 5).map(actor => (
                                <div key={actor.id} className="w-24 flex-shrink-0 text-center">
                                    {actor.profile_path ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${actor.profile_path}`}
                                            className="w-24 h-24 rounded-full object-cover mb-2"
                                            alt={actor.name}
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-700 mb-2 flex items-center justify-center text-xs">No Image</div>
                                    )}
                                    <p className="text-sm font-medium truncate">{actor.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
