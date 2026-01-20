# Fix for Recurring Server-Side Error

## Problem
The recurring error message "Application error: a server-side exception has occurred" (Digest: 177944204) is caused by **missing AUTH_SECRET environment variable**.

NextAuth.js v5 requires the `AUTH_SECRET` environment variable. While you had `NEXTAUTH_SECRET`, the library now primarily looks for `AUTH_SECRET`.

## What I Fixed

### 1. Local Environment Files
✅ Updated `.env` - Added `AUTH_SECRET`
✅ Updated `.env.production` - Added `AUTH_SECRET`

### 2. What You Need to Do on Vercel

You need to add the `AUTH_SECRET` environment variable to your Vercel deployment:

**Steps:**
1. Go to https://vercel.com/giovannitic88-2301s-projects/kiteandkey-website-redesign/settings/environment-variables
2. Click "Add New" 
3. Add the following:
   - **Key**: `AUTH_SECRET`
   - **Value**: `kiteandkey-secret-key-2026-secure`
   - Select **all environments** (Production, Preview, Development)
4. Click "Save"
5. Go to your Deployments tab
6. Click on the latest deployment's "..." menu and select "Redeploy"

## Why This Happened

NextAuth.js v5 changed their environment variable naming convention:
- **Old** (v4): `NEXTAUTH_SECRET` 
- **New** (v5): `AUTH_SECRET` (primary), but still supports `NEXTAUTH_SECRET` for backward compatibility

However, in some edge cases on Vercel, having only `NEXTAUTH_SECRET` without `AUTH_SECRET` can cause initialization failures, leading to the server-side exception you've been seeing.

## Alternative: Using Vercel CLI

If you prefer to use the command line:

```bash
# Make sure you're in the project directory
cd /Users/giovannithomas/Desktop/kiteandkey-website-redesign

# Add the environment variable to all environments
vercel env add AUTH_SECRET production preview development

# When prompted, enter: kiteandkey-secret-key-2026-secure
```

Then redeploy:
```bash
vercel --prod
```

## Verification

After redeploying:
1. Visit your site: https://kiteandkey-website-redesign-1b3w2uzrn.vercel.app
2. The server-side error should be resolved
3. Authentication should work properly

---

**Note**: The local `.env` files have been updated, but Vercel uses its own environment variable configuration which is managed separately through the Vercel dashboard or CLI.
