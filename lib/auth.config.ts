import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string // Type assertion if types are not strictly matching
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    providers: [], // Empty providers for middleware compatibility
} satisfies NextAuthConfig
