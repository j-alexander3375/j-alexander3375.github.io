# Language Switcher Troubleshooting Guide

## Issue
The language switcher is not appearing on the website pages.

## Root Cause
When opening HTML files directly in a browser using the `file://` protocol, modern browsers block `fetch()` requests to local JSON files due to CORS (Cross-Origin Resource Sharing) security policies. This prevents the translation data from loading.

## Solutions

### Solution 1: Use a Local HTTP Server (Recommended)

**Option A: Using the provided Python server**
```bash
cd /home/mikopi35p/Documents/DEV/Lotus/site
python3 serve.py
```

Then open: http://localhost:8000/index.html

**Option B: Using Python's built-in server**
```bash
cd /home/mikopi35p/Documents/DEV/Lotus/site
python3 -m http.server 8000
```

Then open: http://localhost:8000/index.html

**Option C: Using PHP (if installed)**
```bash
cd /home/mikopi35p/Documents/DEV/Lotus/site
php -S localhost:8000
```

Then open: http://localhost:8000/index.html

**Option D: Using Node.js http-server (if installed)**
```bash
cd /home/mikopi35p/Documents/DEV/Lotus/site
npx http-server -p 8000
```

Then open: http://localhost:8000/index.html

### Solution 2: Test the Switcher

Open the test page I created:
```bash
cd /home/mikopi35p/Documents/DEV/Lotus/site
python3 serve.py
# Then open: http://localhost:8000/test-switcher.html
```

This page will show you:
- Debug output showing what's happening
- Status of the language switcher initialization
- Manual trigger button to force creation
- Expected behavior checklist

### Solution 3: Browser Extension (Firefox Only)

For Firefox, you can disable CORS temporarily:
1. Install the "CORS Everywhere" extension
2. Enable it while testing
3. **Remember to disable it after testing for security**

## What Was Fixed

I made the following improvements to ensure the language switcher appears:

1. **Error Handling**: Modified `loadTranslationsFromFile()` to still create the language switcher even if translations fail to load.

2. **Fallback Initialization**: Added a safety check in `init.js` that creates the switcher after 500ms if it's not found.

3. **Test Page**: Created `test-switcher.html` with debugging output to help diagnose issues.

4. **Local Server**: Created `serve.py` for easy local testing.

## Verifying the Fix

1. Start the local server:
   ```bash
   cd /home/mikopi35p/Documents/DEV/Lotus/site
   python3 serve.py
   ```

2. Open http://localhost:8000/index.html

3. You should see:
   - Language switcher (flags) in top-right corner
   - Theme toggle (sun/moon icon) below the language switcher
   - Both should work properly

4. Test the switcher:
   - Click different language flags
   - Navigation items should translate
   - Header should translate
   - Selected language should be highlighted

## Browser Console Debugging

Open the browser console (F12) and look for:
- ✅ `Translations loaded successfully` - Good!
- ❌ `Failed to load translations` - CORS issue (use HTTP server)
- ⚠️ `Language switcher not found, creating it now` - Fallback triggered
- 🎋 `Lotus Website Initialized` - Page loaded successfully

## File Locations

- Language switcher: `js/translation.js` (line ~118)
- Initialization: `js/init.js` (line ~7)
- Translations: `locales/translations.json`
- Test page: `test-switcher.html`
- Server script: `serve.py`
- Styles: `style.css` (line ~280 for `.language-switcher`)

## Current Features

### Language Switcher
- Fixed position (top-right on desktop, bottom-left on mobile)
- 6 languages: English, Spanish, French, German, Japanese, Chinese
- Active language highlighted with gradient
- Persists selection in localStorage
- Translates: navigation, header, and other marked elements

### Theme Toggle
- Fixed position (below language switcher)
- Light/Dark modes
- Persists selection in localStorage
- Smooth transitions
- CSS variables for all colors

## Need More Help?

If the switcher still doesn't appear after using an HTTP server:
1. Open browser console (F12)
2. Look for error messages
3. Try the test page: http://localhost:8000/test-switcher.html
4. Check that `locales/translations.json` exists and is valid JSON
5. Verify all script tags are in the correct order in HTML files
