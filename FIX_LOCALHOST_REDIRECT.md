# 🛑 Fix: Website Redirecting to Localhost

If you are redirected to `http://localhost:3000` after logging in on the live site, it means **Vercel has been told your website URL is localhost**.

This happens because there is a `NEXTAUTH_URL` variable in your Vercel settings that is overriding everything else.

## ⚡️ REQUIRED ACTION (Take 2 Minutes)

You must go to your Vercel Project Settings and **DELETE** the incorrect variable.

1.  **Go to Vercel Settings**:
    [https://vercel.com/giovannitic88-2301s-projects/kiteandkey-website-redesign/settings/environment-variables](https://vercel.com/giovannitic88-2301s-projects/kiteandkey-website-redesign/settings/environment-variables)

2.  **Find `NEXTAUTH_URL`**:
    - Look for a variable named `NEXTAUTH_URL`.
    - Does it have a value like `http://localhost:3000`? **If yes, DELETE IT.** (Click the trash icon).
    - **Why?** Vercel now automatically detects your real URL (`kiteandkey.com.au`). Hardcoding it to localhost breaks the live site.

3.  **Check `AUTH_SECRET` (Again)**:
    - Ensure `AUTH_SECRET` exists.
    - Click "Edit" and make sure **Production** is checked.

4.  **REDEPLOY**:
    - Go to the **Deployments** tab.
    - Click the three dots on the latest deployment -> **Redeploy**.
    - (Wait for it to finish).

## Verification
Once deployed:
1.  Go to `https://www.kiteandkey.com.au/admin`
2.  Login.
3.  You should stay on the live site and see the dashboard!
