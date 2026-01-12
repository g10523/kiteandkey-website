#!/bin/bash

# Quick Local PostgreSQL Setup for Kite & Key
# This script helps you set up a local PostgreSQL database

echo "🚀 Kite & Key - PostgreSQL Setup"
echo "================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed."
    echo ""
    echo "Install PostgreSQL:"
    echo "  macOS: brew install postgresql@15"
    echo "  Ubuntu: sudo apt install postgresql"
    echo "  Windows: Download from postgresql.org"
    echo ""
    exit 1
fi

echo "✅ PostgreSQL is installed"

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo "⚠️  PostgreSQL is not running. Starting it..."

    # Try to start on macOS
    if command -v brew &> /dev/null; then
        brew services start postgresql@15 || brew services start postgresql
    fi

    # Give it a moment to start
    sleep 2

    if ! pg_isready &> /dev/null; then
        echo "❌ Could not start PostgreSQL automatically."
        echo "Please start it manually:"
        echo "  macOS: brew services start postgresql@15"
        echo "  Ubuntu: sudo systemctl start postgresql"
        exit 1
    fi
fi

echo "✅ PostgreSQL is running"
echo ""

# Create database
echo "Creating database 'kiteandkey_dev'..."
createdb kiteandkey_dev 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully"
else
    echo "⚠️  Database might already exist (this is okay)"
fi

echo ""
echo "📝 Update your .env file with:"
echo "================================="
echo "DATABASE_URL=\"postgresql://$(whoami)@localhost:5432/kiteandkey_dev\""
echo "DIRECT_URL=\"postgresql://$(whoami)@localhost:5432/kiteandkey_dev\""
echo "================================="
echo ""
echo "Then run:"
echo "  npx prisma migrate dev"
echo "  npx prisma generate"
echo "  npm run dev"
echo ""
echo "✅ Setup complete!"
