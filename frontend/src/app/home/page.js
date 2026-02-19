"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieRow from '@/components/MovieRow';
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
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [action, setAction] = useState([]);
    const [comedy, setComedy] = useState([]);
    const [series, setSeries] = useState([]);
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
                const [trendingRes, popularRes, topRatedRes, upcomingRes, actionRes, comedyRes, seriesRes] = await Promise.all([
                    moviesApi.getTrending(),
                    moviesApi.getPopular(),
                    moviesApi.getTopRated(),
                    moviesApi.getUpcoming(),
                    moviesApi.getAction(),
                    moviesApi.getComedy(),
                    moviesApi.getSeries(),
                ]);
                setTrending(trendingRes.data.data);
                setPopular(popularRes.data.data);
                setTopRated(topRatedRes.data.data);
                setUpcoming(upcomingRes.data.data);
                setAction(actionRes.data.data);
                setComedy(comedyRes.data.data);
                setSeries(seriesRes.data.data);

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
                        {/* OMDB doesn't have backdrop, use Poster with blur or just cover */}
                        <div className="absolute inset-0 bg-[#0f1014]" />
                        <img
                            src={bannerMovie.Poster !== 'N/A' ? bannerMovie.Poster : "https://via.placeholder.com/1280x720?text=No+Image"}
                            alt={bannerMovie.Title}
                            className="w-full h-full object-cover opacity-40 blur-sm md:blur-md"
                        />
                        <div className="absolute inset-0 flex justify-end md:justify-center items-center opacity-30">
                            <img src={bannerMovie.Poster} className="h-full object-contain hidden md:block" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    </div>

                    <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl text-white space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">{bannerMovie.Title}</h1>
                        <div className="flex gap-2 text-gray-300 font-bold">
                            <span>{bannerMovie.Year}</span>
                            <span className="uppercase border px-1 text-xs items-center flex">{bannerMovie.Type}</span>
                        </div>
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
            <div className={`pl-4 md:pl-12 relative z-10 pb-24 ${bannerMovie ? '-mt-24' : 'pt-24'}`}>
                <MovieRow title="Box Office 2024" movies={trending} />
                <MovieRow title="Best of 2023" movies={popular} />
                <MovieRow title="Award Winners" movies={topRated} />
                <MovieRow title="Coming Soon (2025)" movies={upcoming} />
                <MovieRow title="Action (War Movies 2024)" movies={action} />
                <MovieRow title="Romance & Comedy 2024" movies={comedy} />
                <MovieRow title="TV Series 2024" movies={series} />
            </div>
        </div>
    );
}
