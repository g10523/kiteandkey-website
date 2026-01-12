#!/bin/bash

# Kite & Key - Setup Validation Script
# This checks if your database is properly configured

echo "🔍 Kite & Key - Setup Checker"
echo "=============================="
echo ""

ERRORS=0
WARNINGS=0

# Check 1: .env file exists
echo -n "Checking .env file... "
if [ -f ".env" ]; then
    echo "✅"
else
    echo "❌"
    echo "   Error: .env file not found"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: DATABASE_URL is set
echo -n "Checking DATABASE_URL... "
if [ -f ".env" ] && grep -q "DATABASE_URL=" .env; then
    if grep -q "DATABASE_URL=\"postgresql://" .env; then
        if grep -q "DATABASE_URL=\"postgresql://username:password@host" .env; then
            echo "⚠️  (still using placeholder)"
            WARNINGS=$((WARNINGS + 1))
        else
            echo "✅"
        fi
    else
        echo "❌"
        echo "   Error: DATABASE_URL doesn't start with postgresql://"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "❌"
    echo "   Error: DATABASE_URL not found in .env"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: DIRECT_URL is set
echo -n "Checking DIRECT_URL... "
if [ -f ".env" ] && grep -q "DIRECT_URL=" .env; then
    if grep -q "DIRECT_URL=\"postgresql://" .env; then
        echo "✅"
    else
        echo "❌"
        echo "   Error: DIRECT_URL doesn't start with postgresql://"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "❌"
    echo "   Error: DIRECT_URL not found in .env"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: node_modules exists
echo -n "Checking dependencies... "
if [ -d "node_modules" ]; then
    echo "✅"
else
    echo "⚠️  (need to run npm install)"
    WARNINGS=$((WARNINGS + 1))
fi

# Check 5: Prisma client generated
echo -n "Checking Prisma Client... "
if [ -d "node_modules/.prisma/client" ]; then
    echo "✅"
else
    echo "⚠️  (need to run npx prisma generate)"
    WARNINGS=$((WARNINGS + 1))
fi

# Check 6: Migrations exist
echo -n "Checking migrations... "
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
    echo "✅"
else
    echo "⚠️  (migrations folder empty or missing)"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "=============================="

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Your setup looks good. Try running:"
    echo "  npm run dev"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  Setup incomplete - $WARNINGS warning(s)"
    echo ""
    echo "Run these commands to complete setup:"
    if [ ! -d "node_modules" ]; then
        echo "  npm install"
    fi
    if [ ! -d "node_modules/.prisma/client" ]; then
        echo "  npx prisma generate"
    fi
    if [ ! -d "prisma/migrations" ] || [ ! "$(ls -A prisma/migrations)" ]; then
        echo "  npx prisma migrate deploy"
    fi
    exit 1
else
    echo "❌ Setup has $ERRORS error(s) and $WARNINGS warning(s)"
    echo ""
    echo "Please fix the errors above, then run:"
    echo "  ./setup-database.sh"
    exit 1
fi
