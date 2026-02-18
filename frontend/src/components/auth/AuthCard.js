"use client";

import { motion } from 'framer-motion';

export default function AuthCard({ children, title }) {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center bg-black md:bg-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[450px] p-[60px] bg-black/75 rounded-md text-white relative z-10"
            >
                <h1 className="text-[32px] font-bold mb-7">{title}</h1>
                {children}
            </motion.div>
        </div>
    );
}
