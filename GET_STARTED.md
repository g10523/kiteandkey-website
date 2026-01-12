# 🚀 Get Started - Kite & Key Database Setup

## Quick Start (5 minutes)

Your consultation booking system is ready to go! You just need to connect a database.

### Step 1: Choose a Database Provider

Pick one (we recommend Supabase):

| Provider | Speed | Difficulty | Free Tier | Location |
|----------|-------|------------|-----------|----------|
| **Supabase** ⭐ | 2 min | Easy | 500MB | Sydney |
| Railway | 2 min | Easy | 500MB | Various |
| Vercel Postgres | 3 min | Medium | 256MB | Global |

### Step 2: Follow the Guide

Open **[DATABASE_SETUP_COMPLETE_GUIDE.md](DATABASE_SETUP_COMPLETE_GUIDE.md)** for detailed step-by-step instructions with screenshots.

### Step 3: Quick Setup

Once you have your database URL:

```bash
# 1. Update .env file with your database URLs
# 2. Run setup
./setup-database.sh

# 3. Start the app
npm run dev
```

### Step 4: Test It

1. Go to http://localhost:3000/admin/calendar
2. Click "Add Slots"
3. Add a test slot
4. Visit http://localhost:3000/consultation
5. See your slot in the form!

---

## 📚 Documentation

- **[DATABASE_SETUP_COMPLETE_GUIDE.md](DATABASE_SETUP_COMPLETE_GUIDE.md)** - Full setup guide with screenshots
- **[QUICK_DB_SETUP.md](QUICK_DB_SETUP.md)** - Quick reference for all providers
- **[CONSULTATION_SYSTEM_GUIDE.md](CONSULTATION_SYSTEM_GUIDE.md)** - How the system works
- **[SETUP_POSTGRESQL.md](SETUP_POSTGRESQL.md)** - Advanced PostgreSQL options

---

## 🛠️ Helpful Scripts

```bash
# Check if everything is configured correctly
./check-setup.sh

# Setup database (run after adding DATABASE_URL to .env)
./setup-database.sh

# View your data
npx prisma studio
```

---

## ⚡ What You Get

After setup, you'll have:

✅ **Admin Dashboard** at `/admin/calendar`
- Add/delete availability slots
- View upcoming consultations
- Manage bookings

✅ **Consultation Form** at `/consultation`
- Beautiful multi-step form
- Real-time slot availability
- Email confirmations

✅ **Database Tables**
- AvailabilitySlot
- Lead
- Consultation
- User, StudentProfile, ParentProfile
- And more...

---

## 🎯 Architecture

```
User fills form → Selects slot → Database saves booking
                                        ↓
                              Admin sees in dashboard
```

**Flow:**
1. Admin creates slots in `/admin/calendar`
2. Slots stored in PostgreSQL database
3. User visits `/consultation` form
4. Available slots are fetched and displayed
5. User selects slot and submits
6. Booking saved to database
7. Admin sees booking in dashboard
8. Email sent to parent

---

## 🐛 Troubleshooting

**Problem: "Failed to create slot"**
- Solution: You need to set up the database first (see guides above)

**Problem: Database connection error**
- Check `.env` file has correct DATABASE_URL
- Run `./check-setup.sh` to validate configuration

**Problem: Migrations failed**
- Run `npx prisma migrate reset`
- Then `npx prisma migrate deploy`

---

## 📞 Need Help?

1. Check the error message in terminal
2. Run `./check-setup.sh` to see what's missing
3. Review [DATABASE_SETUP_COMPLETE_GUIDE.md](DATABASE_SETUP_COMPLETE_GUIDE.md)
4. Check Supabase/Railway dashboard

---

## ✅ Final Checklist

Before you start developing:

- [ ] Database provider account created (Supabase/Railway/etc)
- [ ] `DATABASE_URL` added to `.env`
- [ ] `DIRECT_URL` added to `.env`
- [ ] Ran `./setup-database.sh` successfully
- [ ] `npm run dev` starts without errors
- [ ] Can add slots at `/admin/calendar`
- [ ] Slots appear at `/consultation`

**Once all checked, you're ready to go! 🎉**

---

## 🚀 Next Steps

After setup:

1. **Create admin user** - Use Prisma Studio
2. **Add real availability slots** - For consultations
3. **Test the booking flow** - End to end
4. **Customize email templates** - In `lib/email.ts`
5. **Deploy to production** - Vercel + production database

---

**Let's get started! Open [DATABASE_SETUP_COMPLETE_GUIDE.md](DATABASE_SETUP_COMPLETE_GUIDE.md) now! 📖**
