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
    basePath: '/api/auth',
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    console.log('🔐 Authorize called with credentials:', { email: credentials?.email })

                    const { email, password } = loginSchema.parse(credentials)
                    console.log('✅ Credentials validated')

                    // 1. MASTER ADMIN ACCOUNTS (Work without Database)
                    const masterAdmins = [
                        { email: 'kkewalram777@gmail.com', password: 'Foundersclub1', name: 'Keisha Walram' },
                        { email: 'giovannitc88@gmail.com', password: 'Foundersclub1', name: 'Giovanni Thomas' }
                    ];

                    const masterAdmin = masterAdmins.find(admin => admin.email === email && admin.password === password);

                    if (masterAdmin) {
                        console.log(`🔓 Master Admin Login: ${masterAdmin.name}`);
                        return {
                            id: `master-admin-${masterAdmin.email}`,
                            email: masterAdmin.email,
                            name: masterAdmin.name,
                            role: 'ADMIN',
                        }
                    }

                    console.log('⚠️ Not a master admin, checking database...')

                    // 2. DATABASE USERS
                    try {
                        const user = await prisma.user.findUnique({
                            where: { email },
                        })

                        console.log('🔍 Database query result:', user ? `User found: ${user.email}` : 'User not found')

                        if (!user) {
                            console.log('❌ No user found with email:', email)
                            return null; // Invalid email
                        }

                        const isValidPassword = await bcrypt.compare(password, user.password)
                        console.log('🔑 Password validation:', isValidPassword ? 'Valid' : 'Invalid')

                        if (!isValidPassword) {
                            console.log('❌ Invalid password for user:', email)
                            return null; // Invalid pass
                        }

                        console.log('✅ Database user authenticated:', user.email)
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
                    console.error('❌ Login Error:', error);
                    return null
                }
            },
        }),
    ],
})
