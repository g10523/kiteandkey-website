# Complete Database Setup Guide for Kite & Key

## 🎯 Goal
Set up a PostgreSQL database so your consultation booking system works.

---

## ⚡ FASTEST METHOD: Supabase (Recommended)

### Why Supabase?
- ✅ Free tier (500MB database)
- ✅ Located in Sydney (low latency for Australian users)
- ✅ Easy setup (2 minutes)
- ✅ Good free tier limits
- ✅ Web interface to manage data

---

## 📝 Step-by-Step Instructions

### STEP 1: Create Supabase Account (30 seconds)

1. Open your browser and go to: **https://supabase.com**
2. Click **"Start your project"** (top right)
3. Click **"Sign in with GitHub"** (fastest option)
4. Authorize Supabase to access your GitHub account

---

### STEP 2: Create New Project (1 minute)

1. After logging in, click **"New Project"** (green button)
2. Fill in the form:
   - **Name**: `kiteandkey` (or whatever you prefer)
   - **Database Password**: Create a strong password
     - **IMPORTANT**: Copy and save this password somewhere safe!
     - Example: `MySecurePassword123!`
   - **Region**: Select **"Australia Southeast (Sydney)"**
   - **Pricing Plan**: Leave as **"Free"**
3. Click **"Create new project"**
4. Wait 1-2 minutes while Supabase sets up your database
   - You'll see a progress indicator
   - Don't close the page!

---

### STEP 3: Get Your Connection Strings (30 seconds)

Once your project is ready:

1. Look at the left sidebar and click the **⚙️ Settings** icon (at the bottom)
2. Click **"Database"** in the settings menu
3. Scroll down to the **"Connection string"** section
4. You'll see several tabs: **URI**, **Golang**, **JDBC**, etc.
5. Click on the **"URI"** tab
6. You'll see a connection string like this:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres
   ```
7. **Copy this entire string**
8. Replace `[YOUR-PASSWORD]` with the password you created in Step 2

Example:
```
Before: postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0...
After:  postgresql://postgres.abc123:MySecurePassword123!@aws-0...
```

---

### STEP 4: Update Your .env File (1 minute)

1. Open your project in VSCode (or your editor)
2. Open the `.env` file (in the root of your project)
3. Find these two lines:
   ```env
   DATABASE_URL="postgresql://username:password@host:5432/database_name"
   DIRECT_URL="postgresql://username:password@host:5432/database_name"
   ```

4. Replace them with your Supabase URLs:

   **For DATABASE_URL** (with pooler):
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

   **For DIRECT_URL** (direct connection):
   ```env
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"
   ```

   **Key differences:**
   - DATABASE_URL uses port **6543** and has `?pgbouncer=true` at the end
   - DIRECT_URL uses port **5432** and has no query parameters

5. **Save the file** (Cmd+S / Ctrl+S)

**Complete example:**
```env
# Environment variables declared in this file are automatically loaded by Prisma.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# PostgreSQL Database URLs
DATABASE_URL="postgresql://postgres.xyzabc123:MySecurePassword123!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xyzabc123:MySecurePassword123!@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
RESEND_API_KEY="re_3AYAZCKU_DGyggA6PytZ5mu7qFRgAkpom"
```

---

### STEP 5: Run the Setup Script (1 minute)

Now we need to create the database tables. Open your terminal in the project folder:

```bash
cd /Users/giovannithomas/Desktop/kiteandkey-website-redesign
./setup-database.sh
```

This script will:
- ✅ Generate Prisma Client
- ✅ Create all database tables
- ✅ Verify the connection works

**What you should see:**
```
🚀 Kite & Key - Database Setup
===============================

✅ .env file found

🔨 Generating Prisma Client...
✅ Prisma Client generated

📊 Running database migrations...
✅ Database migrations complete

🔍 Verifying database connection...
✅ Database connection successful!

================================
✅ Setup Complete!
================================
```

**If you see an error:**
- Double-check your `.env` file
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Make sure there are no extra spaces or quotes

---

### STEP 6: Start Your Application (10 seconds)

```bash
npm run dev
```

You should see:
```
> kiteandkey-website-redesign@1.0.0 dev
> next dev

  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

---

### STEP 7: Test Everything! (1 minute)

1. **Open your browser** and go to: http://localhost:3000/admin/calendar

2. **Log in** (if you have auth set up)

3. **Click "Add Slots"** button (top right of the Available Slots section)

4. **Add a test slot:**
   - Date: Tomorrow's date
   - Time: 2:00 PM
   - Duration: 30 mins
   - Click "Add Slot"

5. **You should see:**
   - ✅ "Slot added successfully" message (green notification)
   - ✅ New slot appears in the calendar
   - ✅ No errors in the console

6. **Test the consultation form:**
   - Go to: http://localhost:3000/consultation
   - Scroll through the form to Step 5
   - You should see your test slot available!

---

## 🎉 SUCCESS!

If you completed all steps:
- ✅ Database is connected
- ✅ Tables are created
- ✅ You can add slots
- ✅ Consultation bookings will work
- ✅ Admin dashboard shows data

---

## 🔍 View Your Data (Optional)

Want to see what's in your database?

### Option 1: Prisma Studio (Local)
```bash
npx prisma studio
```
Opens at http://localhost:5555

### Option 2: Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor" in the left sidebar
3. Browse your tables: `AvailabilitySlot`, `Lead`, `Consultation`, etc.

---

## 🐛 Common Issues & Solutions

### Issue 1: "Can't reach database server"
**Solution:**
- Check your internet connection
- Verify DATABASE_URL is correct in `.env`
- Make sure you're using the connection string from the "URI" tab
- Confirm you replaced `[YOUR-PASSWORD]` with actual password

### Issue 2: "Migration failed"
**Solution:**
```bash
npx prisma migrate reset
npx prisma migrate deploy
```

### Issue 3: "Password authentication failed"
**Solution:**
- Your password might have special characters that need URL encoding
- Try wrapping password in quotes or URL encode it:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `!` becomes `%21`

Example:
```
Bad:  MyPass@123!
Good: MyPass%40123%21
```

### Issue 4: "SSL connection required"
**Solution:**
Add `?sslmode=require` to your connection string:
```env
DATABASE_URL="postgresql://...?pgbouncer=true&sslmode=require"
```

### Issue 5: Port already in use (3000)
**Solution:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

---

## 📊 What's in Your Database?

After setup, you'll have these tables:

### Core Tables:
- **AvailabilitySlot** - Time slots for consultations
- **Lead** - Parent/student contact info
- **Consultation** - Booked consultation appointments

### User Management:
- **User** - Admin/parent/student accounts
- **StudentProfile** - Student information
- **ParentProfile** - Parent information
- **TutorProfile** - Tutor information

### Learning Management (Future):
- **ClassSession** - Scheduled classes
- **Attendance** - Student attendance records
- **MindPrintProfile** - Cognitive assessment data

---

## 🚀 Next Steps

1. **Create an admin user** to access the dashboard:
   ```bash
   npx prisma studio
   ```
   - Click on "User" table
   - Add a new record with `role: ADMIN`

2. **Add more availability slots** for real consultations

3. **Test the full booking flow:**
   - User visits `/consultation`
   - Fills out form
   - Selects a slot
   - Submits booking
   - Check `/admin/calendar` to see the booking

4. **Deploy to production:**
   - Push to GitHub
   - Deploy on Vercel
   - Add production environment variables

---

## 💡 Pro Tips

1. **Backup your database password** - Store it in a password manager!

2. **Use different databases** for development and production:
   - Dev: Supabase free tier
   - Prod: Vercel Postgres or Supabase Pro

3. **Monitor your usage** - Supabase free tier has limits:
   - 500MB database size
   - 2GB bandwidth/month
   - 50MB file storage

4. **Enable backups** in Supabase:
   - Go to Settings > Database > Backups
   - Configure automatic backups

---

## 🆘 Still Stuck?

If something isn't working:

1. **Check the terminal** for error messages
2. **Check browser console** (F12) for errors
3. **Verify .env file**:
   ```bash
   cat .env
   ```
   Make sure values look correct

4. **Test database connection**:
   ```bash
   npx prisma db execute --stdin <<< "SELECT 1;"
   ```

5. **View detailed logs**:
   ```bash
   DATABASE_URL="your-url" npx prisma migrate deploy --verbose
   ```

---

## ✅ Checklist

Before moving on, confirm:

- [ ] Supabase project created
- [ ] Database password saved
- [ ] Connection strings added to `.env`
- [ ] `./setup-database.sh` ran successfully
- [ ] `npm run dev` starts without errors
- [ ] Can add slots at `/admin/calendar`
- [ ] Slots appear at `/consultation`
- [ ] Can view data in Prisma Studio or Supabase dashboard

---

**Congratulations! Your database is fully set up and working! 🎉**

The consultation booking system is now live and ready to use!
