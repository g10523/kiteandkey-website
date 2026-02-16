# LMS Dashboard Demo - Integration Guide

This guide explains how to integrate the LMS dashboard demo into your existing website.

## What's Included

The demo version includes:
- ✅ Full dashboard view with all visual elements
- ✅ Scrollable content
- ✅ No sidebar (hidden)
- ✅ All interactions disabled (view-only)
- ✅ MindPrint badge visible
- ✅ Responsive design

## Option 1: Build and Host Separately

### Step 1: Build the Demo
```bash
npm run build
```

### Step 2: Deploy the Build
Upload the `dist` folder contents to your web server.

### Step 3: Embed via iframe
Add this to your existing website:

```html
<iframe 
  src="https://yourdomain.com/demo.html" 
  width="100%" 
  height="800px"
  frameborder="0"
  scrolling="yes"
  style="border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
```

## Option 2: Inline Embed (Advanced)

If you want to embed directly without an iframe:

### Step 1: Build for Production
```bash
npm run build
```

### Step 2: Extract Assets
From the `dist` folder, you'll need:
- All CSS files from `assets/`
- All JS files from `assets/`
- The `zen_garden_background.png` image

### Step 3: Add to Your Website
```html
<!-- In your <head> -->
<link rel="stylesheet" href="/path/to/lms-demo.css">

<!-- Where you want the demo to appear -->
<div id="lms-demo-root"></div>

<!-- Before closing </body> -->
<script type="module" src="/path/to/lms-demo.js"></script>
```

## Option 3: Development Preview

For testing during development:

### Step 1: Run Dev Server
```bash
npm run dev
```

### Step 2: Access Demo
Navigate to: `http://localhost:5173/demo.html`

### Step 3: Embed in Your Dev Site
```html
<iframe 
  src="http://localhost:5173/demo.html" 
  width="100%" 
  height="800px"
  frameborder="0"
></iframe>
```

## Customization

### Adjust Height
Change the iframe height to fit your needs:
```html
<iframe height="600px">  <!-- Smaller -->
<iframe height="1000px"> <!-- Larger -->
<iframe height="100vh">  <!-- Full viewport -->
```

### Responsive Width
```html
<div style="max-width: 1400px; margin: 0 auto;">
  <iframe src="..." width="100%" height="800px"></iframe>
</div>
```

### Add Container Styling
```html
<div class="lms-demo-container">
  <h2>Experience Our Learning Management System</h2>
  <p>Scroll through the dashboard to see how students track their progress</p>
  <iframe src="..." width="100%" height="800px"></iframe>
</div>

<style>
.lms-demo-container {
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 16px;
}
</style>
```

## Features Disabled in Demo

The following are view-only (not clickable):
- ❌ Resume Lesson button
- ❌ Subject navigation
- ❌ Assignment links
- ❌ Quick action buttons
- ❌ View All links
- ❌ Sidebar (completely hidden)

Users can:
- ✅ Scroll through the dashboard
- ✅ View all content
- ✅ See animations and hover effects (visual only)

## Production Checklist

Before deploying to production:

1. ✅ Build the project: `npm run build`
2. ✅ Test the demo.html file locally
3. ✅ Verify all images load correctly
4. ✅ Check responsive behavior on mobile
5. ✅ Ensure zen garden background displays
6. ✅ Confirm no console errors
7. ✅ Test iframe embedding on your site

## Troubleshooting

### Images Not Loading
Make sure the `zen_garden_background.png` is in the `public` folder and accessible at `/zen_garden_background.png`

### Iframe Not Scrolling
Add `scrolling="yes"` to the iframe tag

### Content Cut Off
Increase the iframe height or use `height="100vh"`

### CORS Issues
If hosting on a different domain, ensure your server allows iframe embedding by setting appropriate CORS headers.

## Support

For questions or issues, contact the development team.
