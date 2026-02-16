# Quick Guide: Adding Demo to Your Existing Website

## ✅ Build Complete!

The demo has been successfully built. Here's how to add it to your existing website:

## Step 1: Locate the Built Files

After running `npm run build`, you'll find these files in the `dist` folder:

```
dist/
├── index.html
├── demo.html (if you built with demo)
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── ...
└── zen_garden_background.png
```

## Step 2: Copy to Your Website

### Option A: Copy Everything (Recommended)
Copy the entire `dist` folder contents to a subdirectory in your website:

```bash
# From your terminal:
cp -r dist/* /path/to/your-website/lms-demo/
```

Your website structure will look like:
```
your-website/
├── index.html (your existing site)
├── lms-demo/
│   ├── index.html (the LMS demo)
│   ├── assets/
│   └── zen_garden_background.png
```

### Option B: Rename and Organize
```bash
# Create a demo folder
mkdir /path/to/your-website/demo

# Copy files
cp dist/index.html /path/to/your-website/demo/
cp -r dist/assets /path/to/your-website/demo/
cp dist/zen_garden_background.png /path/to/your-website/demo/
```

## Step 3: Embed in Your Website

Add this HTML to any page where you want to show the demo:

```html
<!-- Full Page Embed -->
<iframe 
  src="/lms-demo/index.html" 
  width="100%" 
  height="100vh"
  frameborder="0"
  scrolling="yes"
  style="border: none;"
></iframe>

<!-- OR Contained Embed -->
<div style="max-width: 1400px; margin: 2rem auto; padding: 0 1rem;">
  <h2>Experience Our Learning Platform</h2>
  <iframe 
    src="/lms-demo/index.html" 
    width="100%" 
    height="800px"
    frameborder="0"
    scrolling="yes"
    style="
      border: 1px solid #e5e7eb; 
      border-radius: 16px; 
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    "
  ></iframe>
</div>
```

## Step 4: Test It

1. Open your website in a browser
2. Navigate to the page with the iframe
3. You should see the LMS dashboard
4. Verify you can scroll but not click buttons

## Customization Options

### Adjust Height
```html
<iframe height="600px">   <!-- Shorter -->
<iframe height="1000px">  <!-- Taller -->
<iframe height="100vh">   <!-- Full screen -->
```

### Add a Container
```html
<section class="demo-section">
  <div class="container">
    <h2>See Our Platform in Action</h2>
    <p>Scroll through to explore the student dashboard</p>
    <iframe src="/lms-demo/index.html" ...></iframe>
  </div>
</section>
```

### Style the Container
```css
.demo-section {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  padding: 4rem 2rem;
}

.demo-section iframe {
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(107, 91, 149, 0.2);
}
```

## Troubleshooting

### Images Not Loading
Make sure `zen_garden_background.png` is in the same directory as `index.html` or update the path in the CSS.

### Iframe Not Showing
Check browser console for errors. Ensure the path to `/lms-demo/index.html` is correct.

### Content Cut Off
Increase the iframe height or use `height="100vh"` for full viewport height.

## Done! 🎉

Your LMS demo is now embedded in your website. Users can scroll and view but cannot interact with buttons or navigate away.
