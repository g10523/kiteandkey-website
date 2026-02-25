#!/bin/bash

echo "🚀 Kite & Key API Setup"
echo "======================="

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL not found. Please install PostgreSQL 15+"
    echo "   macOS: brew install postgresql@15"
    echo "   Or use Docker: docker-compose up -d postgres"
    exit 1
fi

# Check if database exists
echo "🗄️  Checking database..."
if ! psql -lqt | cut -d \| -f 1 | grep -qw kite_and_key_dev; then
    echo "📝 Creating database..."
    createdb kite_and_key_dev
    echo "✅ Database created"
else
    echo "✅ Database exists"
fi

# Run migrations
echo "🔄 Running migrations..."
npm run migrate

if [ $? -ne 0 ]; then
    echo "❌ Migration failed"
    exit 1
fi

echo "✅ Migrations complete"

# Run seeds
echo "🌱 Seeding data..."
npm run seed

if [ $? -ne 0 ]; then
    echo "❌ Seeding failed"
    exit 1
fi

echo "✅ Seed data loaded"

# Print success message
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Seeded Accounts:"
echo "   Admin:   admin@kiteandkey.academy / Admin@123"
echo "   Tutor:   sarah.chen@kiteandkey.academy / Tutor@123"
echo "   Student: alex.martinez@student.kk.edu / Student@123"
echo ""
echo "🚀 Start the server with: npm run dev"
echo ""
