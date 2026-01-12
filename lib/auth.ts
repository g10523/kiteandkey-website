import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { authConfig } from "./auth.config"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = loginSchema.parse(credentials)

                    // FALLBACK: Master Admin for Development/Recovery
                    // This allows login even if the database is down
                    if (email === 'admin@kiteandkey.com.au' && password === 'admin123') {
                        return {
                            id: 'master-admin',
                            email: 'admin@kiteandkey.com.au',
                            name: 'Admin User',
                            role: 'ADMIN',
                        }
                    }

                    const user = await prisma.user.findUnique({
                        where: { email },
                    })

                    if (!user) {
                        throw new Error("Invalid credentials")
                    }

                    const isValidPassword = await bcrypt.compare(password, user.password)

                    if (!isValidPassword) {
                        throw new Error("Invalid credentials")
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }
                } catch (error) {
                    return null
                }
            },
        }),
    ],
})
