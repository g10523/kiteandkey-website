# PostgreSQL Setup Guide

## The Problem

Your Prisma schema is configured for PostgreSQL, but your `.env` file still has the old SQLite connection string. This causes the error:

```
the URL must start with the protocol `postgresql://` or `postgres://`
```

## Solution Options

### Option 1: Vercel Postgres (Recommended for Production)

1. **Create Database in Vercel:**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose a region (close to your users)
   - Click "Create"

2. **Get Connection Strings:**
   - After creation, click on your database
   - Go to the ".env.local" tab
   - Copy the `POSTGRES_URL` and `POSTGRES_URL_NON_POOLING` values

3. **Update Your `.env` File:**
   ```bash
   DATABASE_URL="<your-POSTGRES_URL-value>"
   DIRECT_URL="<your-POSTGRES_URL_NON_POOLING-value>"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### Option 2: Local PostgreSQL for Development

1. **Install PostgreSQL:**

   **macOS (using Homebrew):**
   ```bash
   brew install postgresql@15
   brew services start postgresql@15
   ```

   **Ubuntu/Debian:**
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

   **Windows:**
   - Download from https://www.postgresql.org/download/windows/
   - Run the installer
   - Remember the password you set for the `postgres` user

2. **Create Database:**
   ```bash
   # Connect to PostgreSQL
   psql postgres

   # Create database (in psql prompt)
   CREATE DATABASE kiteandkey_dev;

   # Create user (optional, for better security)
   CREATE USER kiteandkey WITH PASSWORD 'your_password_here';
   GRANT ALL PRIVILEGES ON DATABASE kiteandkey_dev TO kiteandkey;

   # Exit psql
   \q
   ```

3. **Update `.env` File:**
   ```bash
   DATABASE_URL="postgresql://kiteandkey:your_password_here@localhost:5432/kiteandkey_dev"
   DIRECT_URL="postgresql://kiteandkey:your_password_here@localhost:5432/kiteandkey_dev"
   ```

   Or if you're using the default `postgres` user:
   ```bash
   DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/kiteandkey_dev"
   DIRECT_URL="postgresql://postgres:your_postgres_password@localhost:5432/kiteandkey_dev"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### Option 3: Supabase (Free PostgreSQL)

1. **Create Account:**
   - Go to https://supabase.com
   - Sign up for free account
   - Create new project

2. **Get Connection String:**
   - Go to Project Settings > Database
   - Copy the "Connection string" under "Connection pooling"
   - Replace `[YOUR-PASSWORD]` with your database password

3. **Update `.env` File:**
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### Option 4: Railway (Free PostgreSQL)

1. **Create Account:**
   - Go to https://railway.app
   - Sign up (GitHub login recommended)
   - Create new project

2. **Add PostgreSQL:**
   - Click "New" > "Database" > "Add PostgreSQL"
   - Wait for deployment

3. **Get Connection Strings:**
   - Click on the PostgreSQL service
   - Go to "Connect" tab
   - Copy the "Postgres Connection URL"

4. **Update `.env` File:**
   ```bash
   DATABASE_URL="<Railway connection URL>"
   DIRECT_URL="<Railway connection URL>"
   ```

5. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## After Setting Up Database

1. **Restart Development Server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test the Connection:**
   - Go to `/admin/calendar`
   - Try adding a slot
   - Check if it works!

3. **Verify in Database (Optional):**
   ```bash
   npx prisma studio
   ```
   This opens a GUI where you can see your database tables and data.

## Common Issues

### "Connection refused" Error
- **Local PostgreSQL:** Make sure PostgreSQL service is running
  ```bash
  # macOS
  brew services start postgresql@15

  # Ubuntu
  sudo systemctl start postgresql
  ```

### "Password authentication failed"
- Double-check your password in the connection string
- Make sure there are no special characters that need URL encoding

### "Database does not exist"
- Create the database first:
  ```bash
  psql postgres -c "CREATE DATABASE kiteandkey_dev;"
  ```

### Migration Errors
- If you have existing SQLite data you want to migrate, that's more complex
- For a fresh start, you can reset:
  ```bash
  npx prisma migrate reset
  ```

## Next Steps

After setting up PostgreSQL:
1. The consultation booking system will work perfectly
2. You can add/delete slots from the admin dashboard
3. Users can book consultations through the form
4. All data will be stored in PostgreSQL

## Need Help?

If you encounter any issues:
1. Check the error message in the terminal
2. Verify your `.env` file has the correct connection strings
3. Make sure the database is running and accessible
4. Try restarting the dev server
