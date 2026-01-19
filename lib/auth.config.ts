import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdminPanel = nextUrl.pathname.startsWith('/admin')

            console.log('🔐 Middleware authorized check:', {
                path: nextUrl.pathname,
                isLoggedIn,
                userEmail: auth?.user?.email,
                userRole: auth?.user?.role
            })

            if (isOnAdminPanel) {
                if (isLoggedIn) {
                    console.log('✅ User is logged in, allowing access to:', nextUrl.pathname)
                    return true
                }
                console.log('❌ User not logged in, will redirect to login')
                return false // Redirect unauthenticated users to login page
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                console.log('🔑 JWT callback - Adding user to token:', { id: user.id, email: user.email, role: user.role })
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            console.log('🔑 Session callback - Token:', { id: token.id, role: token.role })
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string // Type assertion if types are not strictly matching
            }
            console.log('🔑 Session callback - Final session:', { userId: session.user?.id, userRole: session.user?.role })
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    // This tells NextAuth to trust the host header from Vercel
    // and automatically use the correct URL (no need for NEXTAUTH_URL env var)
    trustHost: true,
    providers: [], // Empty providers for middleware compatibility
} satisfies NextAuthConfig
