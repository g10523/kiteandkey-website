'use client';

import { useState } from 'react';
import { User, Users, GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Brain } from 'lucide-react';
import Link from 'next/link';

type AccountType = 'student' | 'parent' | 'tutor';

export default function LoginPage() {
    const [accountType, setAccountType] = useState<AccountType>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const accountTypes = [
        {
            type: 'student' as AccountType,
            label: 'Student',
            icon: GraduationCap,
            description: 'Access your personalized learning dashboard',
        },
        {
            type: 'parent' as AccountType,
            label: 'Parent',
            icon: Users,
            description: 'Monitor your child\'s progress and schedule',
        },
        {
            type: 'tutor' as AccountType,
            label: 'Tutor',
            icon: User,
            description: 'Manage your students and sessions',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { accountType, email, password, rememberMe });

        // Redirect based on account type
        if (accountType === 'student') {
            window.location.href = '/dashboard/student';
        } else if (accountType === 'parent') {
            window.location.href = '/dashboard/parent';
        } else {
            window.location.href = '/dashboard/tutor';
        }
    };

    const selectedAccount = accountTypes.find(a => a.type === accountType)!;
    const SelectedIcon = selectedAccount.icon;

    return (
        <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4">
            {/* Global Background - subtle unified color */}

            {/* Login Container */}
            <div className="w-full max-w-5xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block space-y-8">
                        <div>
                            <Link href="/" className="inline-block mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold font-serif text-[#3F3A52]">Kite & Key</span>
                                </div>
                            </Link>

                            <h1 className="text-5xl font-serif text-[#3F3A52] leading-tight mb-6">
                                Learning<br />Mentorship
                            </h1>
                            <p className="text-lg text-[#6B647F] leading-relaxed max-w-md">
                                Sign in to access your dashboard. We replace academic anxiety with calm, predictable progress.
                            </p>
                        </div>

                        {/* Minimal Features List */}
                        <div className="space-y-4 pt-4">
                            {[
                                'Personalized learning paths',
                                'Real-time progress tracking',
                                'Expert tutor support',
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#E6E0F2] flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#3F3A52] text-[10px]">✓</span>
                                    </div>
                                    <span className="text-[#3F3A52] font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0F0F0]">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 text-center">
                            <Link href="/" className="inline-block">
                                <span className="text-xl font-bold font-serif text-[#3F3A52]">Kite & Key</span>
                            </Link>
                        </div>

                        {/* Account Type Selector - Pill Design */}
                        <div className="mb-10">
                            <div className="bg-[#F7F5FB] p-1 rounded-full flex relative">
                                {accountTypes.map((account) => {
                                    const isActive = accountType === account.type;
                                    return (
                                        <button
                                            key={account.type}
                                            onClick={() => setAccountType(account.type)}
                                            className={`
                                                flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10
                                                ${isActive
                                                    ? 'text-[#3F3A52] bg-white shadow-sm font-bold'
                                                    : 'text-[#8C84A8] hover:text-[#5E5574]'
                                                }
                                            `}
                                        >
                                            {account.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Minimal Info Text */}
                            <div className="mt-4 flex items-center justify-center gap-2 text-[#6B647F]">
                                <SelectedIcon size={16} />
                                <span className="text-sm">{selectedAccount.description}</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-bold text-[#3F3A52] ml-4">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={20} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={`Enter your ${accountType} email`}
                                        required
                                        className="w-full pl-14 pr-6 py-4 rounded-full border border-[#E6E0F2] text-[#3F3A52] placeholder-[#8C84A8] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 focus:border-[#5E5574] transition-all bg-[#FBFAFF]"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-bold text-[#3F3A52] ml-4">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={20} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full pl-14 pr-14 py-4 rounded-full border border-[#E6E0F2] text-[#3F3A52] placeholder-[#8C84A8] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 focus:border-[#5E5574] transition-all bg-[#FBFAFF]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#8C84A8] hover:text-[#5E5574] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between px-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`
                                        w-5 h-5 rounded flex items-center justify-center border transition-colors
                                        ${rememberMe ? 'bg-[#3F3A52] border-[#3F3A52]' : 'border-[#E6E0F2] bg-white group-hover:border-[#8C84A8]'}
                                    `}>
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="hidden"
                                        />
                                        {rememberMe && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span className="text-sm text-[#6B647F]">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm font-bold text-[#3F3A52] hover:text-[#5E5574] hover:underline underline-offset-4 transition-all">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-full bg-[#3F3A52] text-white font-bold hover:bg-[#2D2A3B] transition-all hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2"
                            >
                                Sign In
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        {/* Help Text */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-[#8C84A8]">
                                Need help accessing your account? Contact your administrator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
