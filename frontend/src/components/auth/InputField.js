"use client";

import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const InputField = forwardRef(({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && props.value.length > 0;

    return (
        <div className="relative mb-4">
            <div className="relative">
                <input
                    ref={ref}
                    className={cn(
                        "w-full pt-6 pb-2 px-5 bg-[#333] text-white rounded-[4px] focus:outline-none focus:bg-[#454545] border-none transition-all placeholder-transparent font-medium peer",
                        error ? "border-b-2 border-[#e87c03] rounded-b-none" : "",
                        className
                    )}
                    placeholder={label}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => setIsFocused(false)}
                    {...props}
                />
                <label
                    className={cn(
                        "absolute left-5 text-[#8c8c8c] transition-all duration-200 pointer-events-none origin-[0]",
                        (isFocused || hasValue || (props.value && props.value.length > 0))
                            ? "top-2.5 scale-75 -translate-y-0 text-gray-400"
                            : "top-4 scale-100 text-base"
                    )}
                >
                    {label}
                </label>
            </div>

            {error && (
                <div className="text-[#e87c03] text-[13px] mt-1.5 flex items-center gap-1">
                    {error.message}
                </div>
            )}
        </div>
    );
});

InputField.displayName = "InputField";
export default InputField;
