import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

export const { auth: middleware } = NextAuth(authConfig)

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
