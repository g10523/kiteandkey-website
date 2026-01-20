import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Export auth middleware - this runs on Edge Runtime so it cannot use Prisma
// The authConfig only contains callbacks and pages config, no providers
export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdminPanel = req.nextUrl.pathname.startsWith('/admin')
    const isOnLoginPage = req.nextUrl.pathname === '/admin/login'

    console.log('🔐 Middleware check:', {
        path: req.nextUrl.pathname,
        isLoggedIn,
        userEmail: req.auth?.user?.email,
        userRole: req.auth?.user?.role
    })

    if (isOnAdminPanel && !isOnLoginPage) {
        if (!isLoggedIn) {
            console.log('❌ Not logged in, redirecting to login')
            return Response.redirect(new URL('/admin/login', req.nextUrl))
        }
        console.log('✅ User authenticated, allowing access')
    }
})

export const config = {
    matcher: [
        /*
         * Match all admin routes except:
         * - /admin/login (the login page itself)
         * - /admin/api/* (API routes)
         */
        "/admin/((?!login|api).*)",
    ],
}
