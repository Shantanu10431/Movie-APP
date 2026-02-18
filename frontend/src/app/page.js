"use client";

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center text-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1014]/80 via-transparent to-[#0f1014]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Unlimited movies, TV shows, and more.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300"
          >
            Watch anywhere. Cancel anytime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <Link href="/signup" className="bg-[#E50914] text-white text-xl px-8 py-4 rounded font-bold hover:bg-[#b00710] transition-transform hover:scale-105 inline-block">
              Get Started &gt;
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
