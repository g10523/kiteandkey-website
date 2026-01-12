import "dotenv/config"
import prisma from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
    console.log("🌱 Seeding database...")

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)

    const admin = await prisma.user.upsert({
        where: { email: "admin@kiteandkey.com.au" },
        update: {},
        create: {
            email: "admin@kiteandkey.com.au",
            name: "Admin User",
            password: hashedPassword,
            role: "ADMIN",
        },
    })

    console.log("✅ Created admin user:", admin.email)

    // Create some sample availability slots for next week
    const now = new Date()
    const nextWeek = new Date(now)
    nextWeek.setDate(now.getDate() + 7)

    // Monday to Friday, 9 AM to 5 PM slots
    const slots = []
    for (let day = 0; day < 5; day++) {
        const date = new Date(nextWeek)
        date.setDate(nextWeek.getDate() + day)
        date.setHours(9, 0, 0, 0)

        for (let hour = 9; hour < 17; hour++) {
            const startTime = new Date(date)
            startTime.setHours(hour, 0, 0, 0)

            const endTime = new Date(date)
            endTime.setHours(hour, 30, 0, 0)

            slots.push({
                startTime,
                endTime,
                isBooked: false,
                isEnabled: true,
                maxBookings: 1,
                currentBookings: 0,
                createdBy: admin.id,
            })
        }
    }

    await prisma.availabilitySlot.createMany({
        data: slots,
    })

    console.log(`✅ Created ${slots.length} availability slots`)
    console.log("🎉 Seeding complete!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
