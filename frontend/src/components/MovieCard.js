"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { favoritesApi } from '@/services/api';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite }) {
    const [added, setAdded] = useState(isFavorite);

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (added) {
            await favoritesApi.remove(movie.id);
            setAdded(false);
        } else {
            await favoritesApi.add({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path
            });
            setAdded(true);
        }
        if (onToggleFavorite) onToggleFavorite(movie.id);
    };

    return (
        <Link href={`/movie/${movie.id}`}>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative rounded-md overflow-hidden bg-[#181818] aspect-[2/3] cursor-pointer group"
            >
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            {movie.vote_average?.toFixed(1)}
                        </div>
                        <button
                            onClick={handleFavorite}
                            className="p-1.5 bg-white/10 rounded-full hover:bg-white/30 transition-colors"
                        >
                            {added ? <Check className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4 text-white" />}
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
