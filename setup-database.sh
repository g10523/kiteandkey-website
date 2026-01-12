#!/bin/bash

# Kite & Key - Database Setup Script
# This script sets up your database after you've added the connection strings to .env

set -e  # Exit on error

echo "🚀 Kite & Key - Database Setup"
echo "==============================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Please create a .env file first"
    exit 1
fi

# Check if DATABASE_URL is set
if grep -q "DATABASE_URL=\"postgresql://username:password@host:5432/database_name\"" .env; then
    echo "❌ Error: DATABASE_URL is still using placeholder values"
    echo ""
    echo "Please update your .env file with your actual database connection string."
    echo ""
    echo "Quick setup options:"
    echo "  1. Supabase (recommended): https://supabase.com"
    echo "  2. Railway: https://railway.app"
    echo "  3. Vercel Postgres: https://vercel.com"
    echo ""
    echo "See QUICK_DB_SETUP.md for detailed instructions"
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

# Run migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy
echo "✅ Database migrations complete"
echo ""

# Verify connection
echo "🔍 Verifying database connection..."
if npx prisma db execute --stdin <<EOF
SELECT 1;
EOF
then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "  1. Start the dev server:"
echo "     npm run dev"
echo ""
echo "  2. Create an admin user (if needed):"
echo "     npx prisma studio"
echo "     Navigate to http://localhost:5555"
echo ""
echo "  3. Access admin panel:"
echo "     http://localhost:3000/admin/calendar"
echo ""
echo "🎉 You're all set!"
