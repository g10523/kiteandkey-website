import { signIn } from '@/lib/auth'
import Image from 'next/image'
import { KeyRound } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    // Await searchParams for Next.js 15+ compatibility
    const params = await searchParams
    async function handleLogin(formData: FormData) {
        'use server'

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        console.log('🔐 Login attempt for:', email)
        console.log('📧 Email type:', typeof email, 'length:', email?.length)
        console.log('🔑 Password type:', typeof password, 'length:', password?.length)

        // Validate inputs before attempting sign-in
        if (!email || !password) {
            console.error('❌ Missing email or password')
            redirect('/admin/login?error=Please enter both email and password')
        }

        try {
            // NextAuth v5: signIn with redirectTo will either:
            // 1. Redirect on success (throws NEXT_REDIRECT - this is SUCCESS!)
            // 2. Throw CredentialsSignin error on failure
            console.log('🚀 Calling signIn...')
            await signIn('credentials', {
                email,
                password,
                redirectTo: '/admin',
            })
            console.log('✅ signIn completed without error (this should not happen)')
        } catch (error: any) {
            console.log('🔍 Caught error from signIn:', {
                errorType: error?.type,
                errorName: error?.name,
                errorMessage: error?.message,
                isNextRedirect: error?.message === 'NEXT_REDIRECT' || error?.digest?.includes('NEXT_REDIRECT')
            })

            // CRITICAL: NEXT_REDIRECT is thrown on SUCCESS - we must re-throw it!
            // Check both message and digest for NEXT_REDIRECT
            if (error.message === 'NEXT_REDIRECT' || error?.digest?.includes('NEXT_REDIRECT')) {
                console.log('✅ Login successful - rethrowing NEXT_REDIRECT')
                throw error
            }

            console.error('❌ SignIn error details:', {
                type: error.type,
                name: error.name,
                message: error.message,
                cause: error.cause,
                digest: error.digest
            })

            // NextAuth throws specific error types for actual failures
            // Check if it's a credentials error (invalid email/password)
            if (
                error.type === 'CredentialsSignin' ||
                error.name === 'CredentialsSignin' ||
                error.message?.includes('CredentialsSignin') ||
                error.cause?.err?.toString().includes('CredentialsSignin')
            ) {
                console.error('❌ Invalid credentials detected')
                redirect('/admin/login?error=Invalid credentials')
            }

            // For other errors, show a generic authentication error
            console.error('❌ Generic authentication error')
            redirect('/admin/login?error=Authentication error')
        }
    }

    return (
        <div className="min-h-screen bg-[#E8E8E8] flex flex-col">
            {/* Header matching admin navbar */}
            <header className="bg-gradient-to-r from-[#B8A5D8] via-[#C8B5E8] to-[#B8A5D8] shadow-md">
                <div className="mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                        {/* Logo Icon */}
                        <div className="relative w-8 h-8 overflow-hidden rounded-lg shadow-sm">
                            <Image
                                src="/logo.jpg"
                                alt="Kite & Key Logo"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-bold text-[#3F3A52]">
                            Kite & Key Academy
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center py-12 px-6">
                <div className="w-full max-w-md">
                    {/* Login Form */}
                    <form action={handleLogin} className="rounded-3xl border-2 border-[#5E5574] bg-white p-8 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F1FB] px-4 py-2 text-sm font-semibold text-[#5E5574] mb-4">
                                Admin Access
                            </div>
                            <h2 className="text-2xl font-bold text-[#3F3A52] mb-2">
                                Sign In
                            </h2>
                            <p className="text-[#6B647F] text-sm">
                                Access the admin dashboard
                            </p>
                        </div>

                        {/* Error Message */}
                        {params?.error && (
                            <div className="mb-6 rounded-xl bg-red-50 border-2 border-red-200 p-4">
                                <p className="text-sm font-semibold text-red-700 text-center">
                                    {params.error === 'Invalid credentials'
                                        ? '❌ Incorrect email or password. Please try again.'
                                        : params.error === 'Authentication error'
                                            ? '⚠️ Authentication system error. Please contact support.'
                                            : params.error}
                                </p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#3F3A52]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full rounded-xl border-2 border-[#E6E0F2] px-4 py-3 text-[#3F3A52] transition-all focus:border-[#5E5574] focus:outline-none"
                                    placeholder="admin@kiteandkey.com.au"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#3F3A52]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full rounded-xl border-2 border-[#E6E0F2] px-4 py-3 text-[#3F3A52] transition-all focus:border-[#5E5574] focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7C6B94] px-6 py-4 text-base font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="mt-6 rounded-2xl bg-[#F7F5FB] p-4">
                            <p className="text-xs text-[#6B647F] text-center">
                                For security reasons, only authorized Kite & Key staff can access this area.
                            </p>
                        </div>
                    </form>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm font-semibold text-[#5E5574] hover:underline"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
