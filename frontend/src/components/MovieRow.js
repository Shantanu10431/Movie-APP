"use client";

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }) {
    const rowRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-2 md:space-y-4">
            <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>

            <div className="group relative md:-ml-2">
                <ChevronLeft
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
                >
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}
