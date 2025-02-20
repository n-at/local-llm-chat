import Options from './options.mjs';

const ThemeSystemDefault = 'system';
const ThemeLight = 'light';
const ThemeDark = 'dark';

function applyTheme(theme) {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-bs-theme', theme);
}

function isSystemDarkMode() {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

const Theme = {
    init() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newTheme = event.matches ? ThemeDark : ThemeLight;
            if (currentTheme === ThemeSystemDefault) {
                applyTheme(newTheme);
            }
        });
        
        const currentTheme = Options.get().theme;

        if (currentTheme == ThemeLight || currentTheme == ThemeDark) {
            applyTheme(currentTheme);
        } else {
            if (isSystemDarkMode()) {
                applyTheme(ThemeDark);
            } else {
                applyTheme(ThemeLight);
            }
        }
    },
};

export default Theme;
