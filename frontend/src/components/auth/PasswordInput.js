"use client";

import { useState, forwardRef } from 'react';
import InputField from './InputField';

const PasswordInput = forwardRef(({ label = "Password", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <InputField
                ref={ref}
                type={showPassword ? "text" : "password"}
                label={label}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8c8c] hover:text-white transition-colors text-xs uppercase font-medium bg-transparent border-none outline-none cursor-pointer"
            >
                {showPassword ? "HIDE" : "SHOW"}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
