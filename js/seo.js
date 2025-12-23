/**
 * SEO Service Module
 * Manages meta tags, structured data, and SEO optimization for Lotus website
 */

class SEOService {
    constructor() {
        this.siteName = "Lotus Programming Language";
        this.siteUrl = "https://lotus-lang.org";
        this.description = "Lotus - A modern systems programming language that compiles to x86-64 assembly with modular stdlib and Rust-inspired imports.";
        this.author = "j-alexander3375";
        this.locale = "en_US";
    }

    /**
     * Initialize SEO for the page
     * @param {Object} pageConfig - Page configuration with title, description, path, etc.
     */
    initializePage(pageConfig) {
        this.updateMetaTags(pageConfig);
        this.updateStructuredData(pageConfig);
        this.updateOGTags(pageConfig);
        this.updateTwitterTags(pageConfig);
    }

    /**
     * Update standard meta tags
     */
    updateMetaTags(pageConfig) {
        const tags = {
            'description': pageConfig.description || this.description,
            'keywords': pageConfig.keywords || 'Lotus, programming language, systems programming, compiler, x86-64',
            'author': pageConfig.author || this.author,
            'viewport': 'width=device-width, initial-scale=1.0',
            'charset': 'UTF-8'
        };

        // Set or update each meta tag
        Object.entries(tags).forEach(([name, content]) => {
            if (name === 'charset') {
                let metaCharset = document.querySelector('meta[charset]');
                if (!metaCharset) {
                    metaCharset = document.createElement('meta');
                    metaCharset.setAttribute('charset', 'UTF-8');
                    document.head.insertBefore(metaCharset, document.head.firstChild);
                }
            } else if (name === 'viewport') {
                this.setMetaTag(name, content, 'name');
            } else {
                this.setMetaTag(name, content, 'name');
            }
        });

        // Add canonical URL
        this.setCanonicalURL(pageConfig.path);
    }

    /**
     * Update Open Graph meta tags for social sharing
     */
    updateOGTags(pageConfig) {
        const ogTags = {
            'og:title': pageConfig.title || this.siteName,
            'og:description': pageConfig.description || this.description,
            'og:type': pageConfig.ogType || 'website',
            'og:url': `${this.siteUrl}${pageConfig.path || ''}`,
            'og:site_name': this.siteName,
            'og:locale': this.locale,
            'og:image': pageConfig.image || `${this.siteUrl}/images/logo.png`,
            'og:image:width': '1200',
            'og:image:height': '630'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            this.setMetaTag(property, content, 'property');
        });
    }

    /**
     * Update Twitter Card meta tags
     */
    updateTwitterTags(pageConfig) {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': pageConfig.title || this.siteName,
            'twitter:description': pageConfig.description || this.description,
            'twitter:image': pageConfig.image || `${this.siteUrl}/images/logo.png`,
            'twitter:site': '@LotusLang',
            'twitter:creator': '@' + this.author
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            this.setMetaTag(name, content, 'name');
        });
    }

    /**
     * Set or update a meta tag
     */
    setMetaTag(name, content, type = 'name') {
        let meta = document.querySelector(`meta[${type}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(type, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Set canonical URL
     */
    setCanonicalURL(path) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = `${this.siteUrl}${path || ''}`;
    }

    /**
     * Generate and inject structured data (JSON-LD)
     */
    updateStructuredData(pageConfig) {
        // Remove existing structured data
        const existing = document.querySelector('script[type="application/ld+json"]');
        if (existing) {
            existing.remove();
        }

        let structuredData = pageConfig.structuredData || this.getDefaultStructuredData();
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }

    /**
     * Get default structured data
     */
    getDefaultStructuredData() {
        return {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": this.siteName,
            "description": this.description,
            "url": this.siteUrl,
            "author": {
                "@type": "Person",
                "name": this.author,
                "url": "https://github.com/j-alexander3375"
            },
            "operatingSystem": "Linux, macOS, Windows",
            "applicationCategory": "DeveloperApplication",
            "license": "https://opensource.org/licenses/MIT",
            "sourceCode": "https://github.com/j-alexander3375/Lotus",
            "programmingLanguage": "Go"
        };
    }

    /**
     * Add breadcrumb structured data
     */
    addBreadcrumb(breadcrumbs) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `${this.siteUrl}${crumb.path}`
            }))
        }, null, 2);
        document.head.appendChild(script);
    }

    /**
     * Generate sitemap entry
     */
    generateSitemapEntry(path, lastModified = new Date().toISOString(), changefreq = 'weekly', priority = '0.8') {
        return {
            url: `${this.siteUrl}${path}`,
            lastModified,
            changefreq,
            priority
        };
    }

    /**
     * Log SEO status
     */
    logSEOStatus() {
        console.log('🔍 SEO Configuration:');
        console.log(`Site: ${this.siteName}`);
        console.log(`URL: ${this.siteUrl}`);
        console.log(`Author: ${this.author}`);
        console.log(`Locale: ${this.locale}`);
        console.log('✅ SEO tags initialized');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOService;
}
