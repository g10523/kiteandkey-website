import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { authConfig } from "./auth.config"

const loginSchema = z.object({
    email: z.string().email().trim().toLowerCase(), // normalize email
    password: z.string().min(6).trim(), // whitespace around password should be ignored
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
                    console.log('🔐 Authorize called with credentials details:', {
                        email: credentials?.email,
                        typeOfEmail: typeof credentials?.email,
                        typeOfPassword: typeof credentials?.password,
                        keys: Object.keys(credentials || {})
                    })

                    // BYPASS VALIDATION FOR MASTER ADMIN
                    const rawEmail = String(credentials?.email || '').trim().toLowerCase();
                    const rawPassword = String(credentials?.password || '').trim();

                    console.log('👀 Checking raw credentials:', { rawEmail, passLength: rawPassword.length });

                    const masterAdmins = [
                        { email: 'kkewalram777@gmail.com', password: 'Foundersclub1', name: 'Keisha Walram' },
                        { email: 'giovannitc88@gmail.com', password: 'Foundersclub1', name: 'Giovanni Thomas' }
                    ];

                    const masterAdminManual = masterAdmins.find(admin => admin.email === rawEmail && admin.password === rawPassword);

                    if (masterAdminManual) {
                        console.log(`🔓 Master Admin Login (Manual Check): ${masterAdminManual.name}`);
                        return {
                            id: `master-admin-${masterAdminManual.email}`,
                            email: masterAdminManual.email,
                            name: masterAdminManual.name,
                            role: 'ADMIN',
                        }
                    }

                    // Fallback to Zod for other users
                    let email, password;
                    try {
                        const parsed = loginSchema.parse(credentials)
                        email = parsed.email
                        password = parsed.password
                        console.log('✅ Credentials successfully parsed and validated')
                    } catch (zodError) {
                        console.error('❌ Zod validation error:', zodError)
                        return null
                    }
                    console.log('✅ Credentials validated')

                    console.log('⚠️ Not a master admin (via manual check), checking database...')

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
