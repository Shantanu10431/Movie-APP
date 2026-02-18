"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import InputField from '@/components/auth/InputField';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signupSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().regex(passwordRegex, 'Password must have 1 uppercase, 1 number, 1 special char.'),
    name: z.string().min(2, 'Name is required.'),
});

export default function Signup() {
    const [serverError, setServerError] = useState('');
    const { signup } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
    });

    const emailValue = watch("email");
    const nameValue = watch("name");
    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        setServerError('');
        const res = await signup(data.name, data.email, data.password);
        if (!res.success) {
            setServerError(res.error);
        }
    };

    return (
        <div className="min-h-screen relative w-full bg-black md:bg-transparent">
            <div className="hidden md:block absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
            </div>

            <div className="absolute top-0 left-0 p-6 z-20 w-full flex justify-center items-center">
                <Link href="/">
                    <h1 className="text-red-600 font-bold text-4xl lg:text-5xl drop-shadow-md cursor-pointer tracking-tighter">MOVIENOVA</h1>
                </Link>
            </div>

            <AuthCard title="Sign Up">
                {serverError && (
                    <div className="bg-[#e87c03] text-white p-3 rounded mb-4 text-sm font-medium">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <InputField
                        label="Name"
                        error={errors.name}
                        value={nameValue}
                        {...register('name')}
                    />
                    <InputField
                        label="Email or phone number"
                        type="email"
                        error={errors.email}
                        value={emailValue}
                        {...register('email')}
                    />
                    <PasswordInput
                        label="Password"
                        error={errors.password}
                        value={passwordValue}
                        {...register('password')}
                    />

                    <AuthButton type="submit" loading={isSubmitting}>
                        Sign Up
                    </AuthButton>

                    <div className="mt-16 text-[#737373]">
                        <p>
                            Already have an account?{' '}
                            <Link href="/login" className="text-white hover:underline cursor-pointer">
                                Sign In now.
                            </Link>
                        </p>
                    </div>
                </form>
            </AuthCard>
        </div>
    );
}
