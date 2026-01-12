# Quick Database Setup - Kite & Key

Since PostgreSQL is not installed on your system, here's the **fastest way** to get your app running:

## ⚡ Option 1: Supabase (Recommended - Takes 2 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (fastest)

### Step 2: Create New Project
1. Click "New Project"
2. Give it a name: `kiteandkey`
3. Set a database password (SAVE THIS!)
4. Choose region: `Australia Southeast (Sydney)` (closest to users)
5. Click "Create new project"
6. Wait ~2 minutes for setup

### Step 3: Get Connection Strings
1. After project is created, click "Project Settings" (gear icon in sidebar)
2. Click "Database" in the left menu
3. Scroll to "Connection string"
4. Click "URI" tab
5. Copy the connection string (it looks like: `postgresql://postgres.xxx...`)
6. Replace `[YOUR-PASSWORD]` with the password you set in Step 2

### Step 4: Update .env File
Open `.env` and replace these lines:

```env
DATABASE_URL="postgresql://username:password@host:5432/database_name"
DIRECT_URL="postgresql://username:password@host:5432/database_name"
```

With your actual Supabase connection strings:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"
```

**Note:** You'll have TWO different URLs:
- `DATABASE_URL` - with port `:6543` and `?pgbouncer=true`
- `DIRECT_URL` - with port `:5432` without the query string

### Step 5: Run Migrations
```bash
cd /Users/giovannithomas/Desktop/kiteandkey-website-redesign
npx prisma migrate dev --name init
npx prisma generate
```

### Step 6: Start Your App
```bash
npm run dev
```

### Step 7: Test It!
1. Go to http://localhost:3000/admin/calendar
2. Click "Add Slots"
3. Add a test slot
4. It should work! ✅

---

## 🚀 Option 2: Railway (Alternative - Also Free)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign in with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Provision PostgreSQL"
3. Wait for deployment (~30 seconds)

### Step 3: Get Connection String
1. Click on your PostgreSQL service
2. Go to "Variables" tab
3. Find `DATABASE_URL` variable
4. Copy the full value

### Step 4: Update .env File
```env
DATABASE_URL="your-railway-database-url"
DIRECT_URL="your-railway-database-url"
```

### Step 5: Run Migrations & Start
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

---

## 🎯 After Setup

### Verify Database Connection
```bash
npx prisma studio
```
This opens a GUI at http://localhost:5555 where you can see your database tables.

### Create Admin User
You'll need to create an admin user to access `/admin/calendar`:

```bash
npx prisma db seed
# Or manually create via Prisma Studio
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- Check your internet connection
- Verify the connection string is correct (no extra spaces)
- Make sure you replaced `[YOUR-PASSWORD]` with actual password

### Error: "SSL connection required"
Add to your connection string:
```
?sslmode=require
```

### Error: "Migration failed"
Start fresh:
```bash
npx prisma migrate reset
```

---

## 📊 What Gets Created

After running migrations, these tables will be created:
- `User` - Admin users
- `Lead` - Consultation leads
- `Consultation` - Booked consultations
- `AvailabilitySlot` - Time slots for consultations
- `StudentProfile`, `ParentProfile`, etc. - For future features

---

## ✅ Success Checklist

- [ ] Database created on Supabase/Railway
- [ ] Connection strings added to `.env`
- [ ] Ran `npx prisma migrate dev`
- [ ] Ran `npx prisma generate`
- [ ] Server starts without errors (`npm run dev`)
- [ ] Can add slots in `/admin/calendar`
- [ ] Slots appear in consultation form

---

## 🆘 Need Help?

If you get stuck:
1. Check the terminal for error messages
2. Verify `.env` file has correct URLs
3. Try restarting the dev server
4. Check Supabase/Railway dashboard to confirm database is running

**Common Issue:** Make sure there are no extra quotes or spaces in your `.env` file!

Good luck! 🚀
