# Quick Start Guide - SEO & Translation Services

## 🚀 Getting Started in 5 Minutes

### 1. Basic Setup (Already Done ✅)

All HTML pages already include:
- SEO meta tags
- Script includes for services
- Data attributes for translations

### 2. How to Use

#### View in Different Languages
1. Open any page (e.g., `index.html`)
2. Language switcher appears in top-right corner
3. Click a language button to translate
4. Preference is saved automatically

#### Mark Content for Translation
Add `data-i18n` attribute to elements:

```html
<!-- For text content -->
<h1 data-i18n="header.title">Lotus</h1>

<!-- For HTML content -->
<div data-i18n-html="section.intro">Default HTML</div>

<!-- For input placeholders -->
<input data-i18n="search.placeholder" placeholder="Search...">
```

#### Access Translation Programmatically
```javascript
const translator = new TranslationService();
const title = translator.get('header.title');
translator.setLanguage('es'); // Switch to Spanish
```

### 3. SEO Features (Automatic)

The SEO service automatically:
- ✅ Manages all meta tags
- ✅ Handles Open Graph tags
- ✅ Creates Twitter Cards
- ✅ Generates structured data (JSON-LD)
- ✅ Sets canonical URLs
- ✅ Creates breadcrumbs

**No additional setup needed!** It's all automatic via `init.js`.

### 4. Adding New Content

#### To Add a New Translatable String

1. **Add to `locales/translations.json`:**
```json
{
  "en": {
    "newSection": {
      "title": "New Title",
      "description": "New description"
    }
  },
  "es": {
    "newSection": {
      "title": "Nuevo Título",
      "description": "Nueva descripción"
    }
  }
  // ... repeat for all 6 languages
}
```

2. **Use in HTML:**
```html
<h2 data-i18n="newSection.title">New Title</h2>
<p data-i18n="newSection.description">New description</p>
```

#### To Add a New Language

1. **In `js/translation.js`**, update:
```javascript
this.supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt']; // Add 'pt'
```

2. **Add language name and flag:**
```javascript
getLanguageName(lang) {
    const names = {
        // ... existing
        'pt': 'Português'
    };
    return names[lang] || lang.toUpperCase();
}

getLanguageFlag(lang) {
    const flags = {
        // ... existing
        'pt': '🇵🇹'
    };
    return flags[lang] || '🌐';
}
```

3. **Add translations to `translations.json`:**
```json
{
  "pt": {
    "nav": { "home": "Início", ... },
    // ... all translations
  }
}
```

4. **Update `sitemap.xml`** with new hreflang entries

#### To Add a New Page

1. **Create HTML file** with template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Lotus</title>
    <meta name="description" content="Page description">
    <meta name="keywords" content="keywords">
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <link rel="canonical" href="https://lotus-lang.dev/page.html">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Your content with data-i18n attributes -->
    
    <script src="js/seo.js"></script>
    <script src="js/translation.js"></script>
    <script src="js/init.js"></script>
</body>
</html>
```

2. **Add to `js/init.js` configuration:**
```javascript
const configs = {
    '/page.html': {
        title: 'Page Title - Lotus',
        description: 'Page description',
        path: '/page.html',
        keywords: 'keyword1, keyword2',
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Title"
        }
    }
};
```

3. **Add breadcrumb data:**
```javascript
const breadcrumbs = {
    '/page.html': [
        { name: 'Home', path: '/' },
        { name: 'Page Title', path: '/page.html' }
    ]
};
```

4. **Update `sitemap.xml`:**
```xml
<url>
    <loc>https://lotus-lang.dev/page.html</loc>
    <lastmod>2025-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://lotus-lang.dev/page.html"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://lotus-lang.dev/page.html?lang=es"/>
    <!-- ... repeat for all languages -->
</url>
```

### 5. Testing

#### Test Translation
```javascript
// Open browser console
const t = new TranslationService();
t.loadTranslationsFromFile('./locales/translations.json');
t.setLanguage('ja');
console.log(t.get('header.title')); // Should show in Japanese
```

#### Test SEO
1. Open DevTools → Elements
2. Check `<head>` section:
   - ✅ Meta tags present
   - ✅ Open Graph tags correct
   - ✅ Canonical URL set
   - ✅ Page title matches

#### Test Structured Data
1. Visit https://validator.schema.org/
2. Paste page HTML or enter URL
3. Should validate with no errors

### 6. Common Tasks

#### Hide Language Switcher
```css
/* In style.css */
.language-switcher {
    display: none !important;
}
```

#### Change Language Switcher Position
```css
/* In style.css */
.language-switcher {
    position: fixed;
    top: 100px;  /* Change this */
    right: 20px;
}
```

#### Add Another Supported Language
See "To Add a New Language" above.

#### Disable Auto Language Detection
```javascript
// In js/init.js, modify TranslationService initialization:
const translator = new TranslationService();
translator.currentLanguage = 'en'; // Force English
```

#### Override Page SEO Configuration
```javascript
// In js/init.js, in DOMContentLoaded event:
const customConfig = {
    title: 'Custom Title',
    description: 'Custom description',
    // ... other properties
};
seoService.initializePage(customConfig);
```

### 7. Troubleshooting

#### Translations Not Showing
1. Check browser console for errors
2. Verify `locales/translations.json` is accessible
3. Check translation keys match exactly (case-sensitive)
4. Ensure `data-i18n` attributes are spelled correctly

#### Language Switcher Not Appearing
1. Check `style.css` is loaded
2. Verify `.language-switcher` CSS is not hidden
3. Open browser console, check for JavaScript errors
4. Ensure `translation.js` is loaded after DOM ready

#### SEO Tags Not Showing
1. Open DevTools → Elements → head section
2. Check if meta tags are in HTML
3. Verify `seo.js` is loaded
4. Check browser console for errors
5. Ensure page configuration exists in `init.js`

#### Structured Data Validation Fails
1. Use https://validator.schema.org/
2. Check JSON syntax in `init.js`
3. Verify schema matches schema.org format
4. Compare with working page source

### 8. Performance Tips

- **Lazy Load Translations**: Currently loads all at once. For large sites, split by section.
- **Minify JSON**: Compress `translations.json` for production.
- **Cache SEO Service**: Store structured data in localStorage to avoid regenerating.
- **Async Script Loading**: Add `async` attribute to script tags if needed.

### 9. Deployment Checklist

- [ ] All HTML pages have SEO meta tags
- [ ] All HTML pages include service scripts
- [ ] `translations.json` is valid JSON
- [ ] All translation keys are complete
- [ ] `sitemap.xml` is valid XML
- [ ] `robots.txt` is properly configured
- [ ] Language switcher displays correctly
- [ ] Switching languages works
- [ ] Language preference persists (reload page)
- [ ] SEO meta tags appear in head
- [ ] Structured data validates
- [ ] Canonical URLs are correct

### 10. Useful Resources

- [SEO_TRANSLATION_README.md](./SEO_TRANSLATION_README.md) - Full documentation
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What was created
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [schema.org](https://schema.org/) - Structured data schemas
- [Google Search Console](https://search.google.com/search-console/) - Monitor SEO

---

## Quick Reference

### Files to Edit
| Task | File |
|------|------|
| Add translations | `locales/translations.json` |
| Customize SEO | `js/init.js` |
| Change language switcher | `style.css` |
| Add new language | `js/translation.js` + `translations.json` |
| Update sitemap | `sitemap.xml` |

### Key Classes

#### TranslationService
```javascript
new TranslationService()
  .setLanguage(lang)           // Change language
  .get(key, default)           // Get translation
  .getSupportedLanguages()     // List available
  .getCurrentLanguage()        // Get current lang
```

#### SEOService
```javascript
new SEOService()
  .initializePage(config)      // Setup page SEO
  .updateMetaTags(config)      // Update meta tags
  .updateOGTags(config)        // Update Open Graph
  .updateTwitterTags(config)   // Update Twitter
  .updateStructuredData(data)  // Add JSON-LD
  .addBreadcrumb(breadcrumbs)  // Add breadcrumbs
```

---

**Last Updated**: December 22, 2025
**Questions?** Check SEO_TRANSLATION_README.md for detailed documentation
