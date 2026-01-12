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

                    // 1. MASTER ADMIN (Works without Database)
                    if (email === 'admin@kiteandkey.com.au' && password === 'admin123') {
                        console.log('🔓 Master Admin Login');
                        return {
                            id: 'master-admin',
                            email: 'admin@kiteandkey.com.au',
                            name: 'Master Admin',
                            role: 'ADMIN',
                        }
                    }

                    // 2. DATABASE USERS
                    try {
                        const user = await prisma.user.findUnique({
                            where: { email },
                        })

                        if (!user) {
                            return null; // Invalid email
                        }

                        const isValidPassword = await bcrypt.compare(password, user.password)

                        if (!isValidPassword) {
                            return null; // Invalid pass
                        }

                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }
                    } catch (dbError) {
                        console.error('⚠️ Database Error during login:', dbError);
                        // If DB fails, only Master Admin can login (which was handled above)
                        return null;
                    }

                } catch (error) {
                    console.error('Login Error:', error);
                    return null
                }
            },
        }),
    ],
})
