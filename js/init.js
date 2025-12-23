/**
 * Main initialization script for Lotus website
 * Integrates SEO and Translation services
 */

// Initialize services when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize Translation Service
    const translator = new TranslationService();
    await translator.loadTranslationsFromFile('./locales/translations.json');
    
    // Initialize SEO Service
    const seoService = new SEOService();
    
    // Determine page-specific configuration
    const pageConfig = getPageConfig();
    
    // Initialize SEO with page-specific data
    seoService.initializePage(pageConfig);
    
    // Add breadcrumb for SEO
    const breadcrumbs = getBreadcrumbs();
    if (breadcrumbs.length > 0) {
        seoService.addBreadcrumb(breadcrumbs);
    }
    
    // Log initialization status
    console.log('🎋 Lotus Website Initialized');
    seoService.logSEOStatus();
    translator.logStatus();
});

/**
 * Get page-specific SEO configuration
 */
function getPageConfig() {
    const path = window.location.pathname;
    
    const configs = {
        '/index.html': {
            title: 'Lotus - Modern Systems Programming Language',
            description: 'Lotus is a modern systems programming language that combines the safety of Rust, performance of C++, and simplicity of Go. Compiles to x86-64 assembly.',
            path: '/',
            keywords: 'Lotus, programming language, systems programming, compiler, x86-64, Go language',
            ogType: 'website',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Lotus Programming Language",
                "description": "A modern systems programming language",
                "url": "https://lotus-lang.dev",
                "downloadUrl": "https://aur.archlinux.org/packages/lotus-lang",
                "softwareVersion": "0.1.0",
                "applicationCategory": "DeveloperApplication",
                "license": "https://opensource.org/licenses/MIT"
            }
        },
        '/getting-started.html': {
            title: 'Getting Started - Lotus Programming Language',
            description: 'Learn how to install and get started with the Lotus programming language. Complete setup guide for all platforms.',
            path: '/getting-started.html',
            keywords: 'Lotus installation, getting started, tutorial, setup, AUR, source build',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Guide",
                "headline": "Getting Started with Lotus",
                "description": "A comprehensive guide to installing and using Lotus"
            }
        },
        '/docs.html': {
            title: 'Documentation - Lotus Programming Language',
            description: 'Complete language reference, API documentation, and compiler usage guide for Lotus programming language.',
            path: '/docs.html',
            keywords: 'Lotus documentation, language reference, API docs, compiler, syntax, standard library',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "TechArticle",
                "headline": "Lotus Programming Language Documentation",
                "description": "Complete reference for Lotus language, standard library, and compiler"
            }
        },
        '/examples.html': {
            title: 'Code Examples - Lotus Programming Language',
            description: 'Practical code examples demonstrating Lotus language features, from hello world to advanced patterns.',
            path: '/examples.html',
            keywords: 'Lotus examples, code samples, tutorials, hello world, programming examples',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Collection",
                "headline": "Lotus Programming Examples",
                "description": "Collection of practical Lotus programming examples"
            }
        },
        '/install.html': {
            title: 'Installation Guide - Lotus Programming Language',
            description: 'Multi-platform installation guide for Lotus. Install via AUR on Arch Linux or build from source on any system.',
            path: '/install.html',
            keywords: 'Lotus install, download, AUR package, Linux, macOS, Windows, build from source',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Lotus",
                "offers": {
                    "@type": "Offer",
                    "url": "https://aur.archlinux.org/packages/lotus-lang",
                    "priceCurrency": "USD",
                    "price": "0"
                }
            }
        }
    };
    
    return configs[path] || {
        title: 'Lotus Programming Language',
        description: 'A modern systems programming language combining safety, performance, and simplicity.',
        path: path,
        keywords: 'Lotus, programming language, systems programming'
    };
}

/**
 * Get breadcrumb data for current page
 */
function getBreadcrumbs() {
    const path = window.location.pathname;
    
    const breadcrumbs = {
        '/': [
            { name: 'Home', path: '/' }
        ],
        '/getting-started.html': [
            { name: 'Home', path: '/' },
            { name: 'Getting Started', path: '/getting-started.html' }
        ],
        '/docs.html': [
            { name: 'Home', path: '/' },
            { name: 'Documentation', path: '/docs.html' }
        ],
        '/examples.html': [
            { name: 'Home', path: '/' },
            { name: 'Examples', path: '/examples.html' }
        ],
        '/install.html': [
            { name: 'Home', path: '/' },
            { name: 'Installation', path: '/install.html' }
        ]
    };
    
    return breadcrumbs[path] || [];
}

/**
 * Utility: Add a query parameter for language
 */
function setLanguageInURL(lang) {
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState(null, '', newURL);
}

/**
 * Utility: Get language from URL parameter
 */
function getLanguageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
}

// Set up language from URL if present
if (getLanguageFromURL() && typeof TranslationService !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const translator = new TranslationService();
        const lang = getLanguageFromURL();
        if (translator.isSupported(lang)) {
            translator.setLanguage(lang);
        }
    });
}
