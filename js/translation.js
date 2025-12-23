/**
 * Translation Service Module
 * Manages multi-language support for Lotus website
 */

class TranslationService {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
        this.translations = {};
        this.defaultLanguage = 'en';
    }

    /**
     * Initialize translation service with translations object
     * @param {Object} translationsData - Object containing translations by language
     */
    async initialize(translationsData) {
        this.translations = translationsData;
        this.applyTranslations();
        this.setupLanguageSwitcher();
    }

    /**
     * Load translations from JSON file
     * @param {string} filePath - Path to translations JSON file
     */
    async loadTranslationsFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load translations: ${response.status}`);
            }
            const data = await response.json();
            this.translations = data;
            this.applyTranslations();
            this.setupLanguageSwitcher();
            this.updatePageLanguage();
            console.log('✅ Translations loaded successfully');
        } catch (error) {
            console.error('❌ Error loading translations:', error);
        }
    }

    /**
     * Detect browser language
     */
    detectLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('lotus_language');
        if (savedLanguage) {
            return savedLanguage;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        return this.supportedLanguages.includes(browserLang) ? browserLang : this.defaultLanguage;
    }

    /**
     * Set current language
     */
    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} not supported. Using ${this.defaultLanguage}`);
            return;
        }
        this.currentLanguage = lang;
        localStorage.setItem('lotus_language', lang);
        this.applyTranslations();
        this.setupLanguageSwitcher();
        this.updatePageLanguage();
    }

    /**
     * Get translation for a key
     */
    get(key, defaultValue = key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage] || {};

        for (const k of keys) {
            value = value[k];
            if (value === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return defaultValue;
            }
        }

        return value;
    }

    /**
     * Translate specific element or entire page
     */
    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.get(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Handle HTML content
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.get(key);
            element.innerHTML = translation;
        });
    }

    /**
     * Create and setup language switcher
     */
    setupLanguageSwitcher() {
        let switcher = document.getElementById('language-switcher');
        
        if (!switcher) {
            switcher = document.createElement('div');
            switcher.id = 'language-switcher';
            switcher.className = 'language-switcher';
            document.body.appendChild(switcher);
        }

        // Clear existing options
        switcher.innerHTML = '';

        // Add language options
        this.supportedLanguages.forEach(lang => {
            const flag = this.getLanguageFlag(lang);
            const label = this.getLanguageName(lang);
            
            const button = document.createElement('button');
            button.className = `lang-btn ${lang === this.currentLanguage ? 'active' : ''}`;
            button.textContent = `${flag} ${label}`;
            button.onclick = () => this.setLanguage(lang);
            button.title = `Switch to ${label}`;
            
            switcher.appendChild(button);
        });
    }

    /**
     * Get language flag emoji
     */
    getLanguageFlag(lang) {
        const flags = {
            'en': '🇺🇸',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'ja': '🇯🇵',
            'zh': '🇨🇳'
        };
        return flags[lang] || '🌐';
    }

    /**
     * Get language name
     */
    getLanguageName(lang) {
        const names = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ja': '日本語',
            'zh': '中文'
        };
        return names[lang] || lang.toUpperCase();
    }

    /**
     * Update page language attribute
     */
    updatePageLanguage() {
        document.documentElement.lang = this.currentLanguage;
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get all supported languages
     */
    getSupportedLanguages() {
        return this.supportedLanguages.map(lang => ({
            code: lang,
            flag: this.getLanguageFlag(lang),
            name: this.getLanguageName(lang)
        }));
    }

    /**
     * Check if language is supported
     */
    isSupported(lang) {
        return this.supportedLanguages.includes(lang);
    }

    /**
     * Get translation statistics
     */
    getStatistics() {
        const stats = {};
        Object.entries(this.translations).forEach(([lang, trans]) => {
            stats[lang] = this.countKeys(trans);
        });
        return stats;
    }

    /**
     * Count translation keys recursively
     */
    countKeys(obj) {
        let count = 0;
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                count += this.countKeys(obj[key]);
            } else {
                count++;
            }
        }
        return count;
    }

    /**
     * Log translation status
     */
    logStatus() {
        console.log('🌐 Translation Service:');
        console.log(`Current Language: ${this.currentLanguage}`);
        console.log(`Supported Languages: ${this.supportedLanguages.join(', ')}`);
        console.log('Statistics:', this.getStatistics());
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationService;
}
