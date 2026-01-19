# Vercel Environment Variables Setup

## Critical Issue: Admin Login Not Working on Live Server

The error "Application error: a server-side exception has occurred" is caused by missing environment variables in Vercel.

## Required Environment Variables for Vercel

You need to add these environment variables to your Vercel project:

### 1. NEXTAUTH_SECRET (REQUIRED)
```
NEXTAUTH_SECRET=kiteandkey-secret-key-2026-secure
```
**Purpose**: Used to encrypt JWT tokens and session data
**Critical**: Without this, authentication will fail completely

### 2. NEXTAUTH_URL (REQUIRED for Production)
```
NEXTAUTH_URL=https://kiteandkey-website-redesign-1b3w2uzrn.vercel.app
```
**Purpose**: Tells NextAuth what your production URL is
**Note**: Replace with your actual production domain if you have a custom domain

### 3. DATABASE_URL (If using database auth)
```
DATABASE_URL=postgresql://postgres.ehfrmbksrjgzvsqqmnwk:Qosqej-suqdyt-panxo2@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 4. DIRECT_URL (If using database auth)
```
DIRECT_URL=postgresql://postgres.ehfrmbksrjgzvsqqmnwk:Qosqej-suqdyt-panxo2@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

### 5. STRIPE_SECRET_KEY (For payment functionality)
```
STRIPE_SECRET_KEY=sk_test_...
```

### 6. STRIPE_WEBHOOK_SECRET (For payment webhooks)
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

## How to Add Environment Variables to Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com
2. Select your project: `kiteandkey-website-redesign`
3. Click **Settings** → **Environment Variables**
4. Add each variable:
   - **Key**: Variable name (e.g., `NEXTAUTH_SECRET`)
   - **Value**: Variable value
   - **Environments**: Select **Production**, **Preview**, and **Development**
5. Click **Save**
6. **Redeploy** your project for changes to take effect

### Option 2: Via Vercel CLI
```bash
# Navigate to your project
cd /Users/giovannithomas/Desktop/kiteandkey-website-redesign

# Add environment variables
vercel env add NEXTAUTH_SECRET production
# When prompted, enter: kiteandkey-secret-key-2026-secure

vercel env add NEXTAUTH_URL production
# When prompted, enter: https://kiteandkey-website-redesign-1b3w2uzrn.vercel.app

# Redeploy
vercel --prod
```

## Current Admin Credentials (After Fix)

Once environment variables are set, you can log in with:

**Account 1:**
- Email: `kkewalram777@gmail.com`
- Password: `Foundersclub1`

**Account 2:**
- Email: `giovannitc88@gmail.com`
- Password: `Foundersclub1`

## Troubleshooting

### If login still fails after adding env vars:
1. **Check Vercel Logs**: Go to your deployment → View Function Logs
2. **Verify env vars are set**: Settings → Environment Variables
3. **Redeploy**: Sometimes you need to trigger a new deployment
4. **Check NEXTAUTH_URL**: Make sure it matches your actual domain (no trailing slash)

### Common Issues:
- ❌ **Missing NEXTAUTH_SECRET**: "Application error" on login page
- ❌ **Wrong NEXTAUTH_URL**: Redirects fail or CSRF errors
- ❌ **Not redeployed**: Changes don't take effect until you redeploy

## Quick Fix Checklist
- [ ] Add `NEXTAUTH_SECRET` to Vercel
- [ ] Add `NEXTAUTH_URL` to Vercel (with your actual domain)
- [ ] Add database URLs if using DB auth
- [ ] Redeploy the project
- [ ] Test login at: https://your-domain.vercel.app/admin/login
- [ ] Check Vercel function logs if it still fails

## Security Note
The admin credentials are currently hardcoded in `lib/auth.ts` and work without a database connection. This is intentional for reliability but should be reviewed for production security requirements.
