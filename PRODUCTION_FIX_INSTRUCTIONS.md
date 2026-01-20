# ⚠️ Critical: Fix Environment Variable & Deployment

## 1. Fix Vercel Environment Variable (Most Likely Cause)
Your screenshot showed that `AUTH_SECRET` was only added to the **Preview** environment (indicated by the purple dot). It is **MISSING** from Production.

**You must do this:**
1. Go to [Vercel Environment Variables](https://vercel.com/giovannitic88-2301s-projects/kiteandkey-website-redesign/settings/environment-variables)
2. Find `AUTH_SECRET`
3. Click "Edit"
4. **Check the box for "Production"** (and Development just to be safe)
5. Save
6. **Redeploy** (Go to Deployments -> Redeploy)

Without this, the production site will **fail to authenticate**, causing the redirect loop you are seeing.

## 2. Code Fix: Improved Cookie Handling
I have also updated `lib/auth.config.ts` to explicitly configure how cookies are handled. This ensures that:
- Cookies are set as `Secure` in production
- `SameSite` policy is set to `lax` (prevents browser blocking)
- Cookie name is consistent

This code fix has been pushed to GitHub and will follow your next deployment.

## Summary
- **The Code Fix**: I have handled the code part.
- **The Config Fix**: YOU must enable `AUTH_SECRET` for **Production** on Vercel.
