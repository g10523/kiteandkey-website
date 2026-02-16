import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Export auth middleware - this runs on Edge Runtime so it cannot use Prisma
// The authConfig only contains callbacks and pages config, no providers
export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdminPanel = req.nextUrl.pathname.startsWith('/admin')

    if (isOnAdminPanel) {
        if (!isLoggedIn) {
            console.log('❌ Not logged in, redirecting to external LMS')
            return Response.redirect('https://kite-academy-lms.vercel.app/')
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
