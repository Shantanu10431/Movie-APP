"use client";

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function AuthButton({ children, loading, ...props }) {
    return (
        <motion.button
            whileHover={{ backgroundColor: '#f40612' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-[#E50914] text-white font-bold h-[48px] rounded-[4px] mt-6 transition-colors shadow-sm text-[16px] flex items-center justify-center gap-2"
            {...props}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
        </motion.button>
    );
}
