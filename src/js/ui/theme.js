(() => {

    const ThemeSystemDefault = 'system';
    const ThemeLight = 'light';
    const ThemeDark = 'dark';

    const currentTheme = window.Options.options.theme;

    function applyTheme(theme) {
        const html = document.getElementsByTagName('html')[0];
        html.setAttribute('data-bs-theme', theme);
    }

    function isSystemDarkMode() {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newTheme = event.matches ? ThemeDark : ThemeLight;
        if (currentTheme === ThemeSystemDefault) {
            applyTheme(newTheme);
        }
    });

    if (currentTheme == ThemeLight || currentTheme == ThemeDark) {
        applyTheme(currentTheme);
    } else {
        if (isSystemDarkMode()) {
            applyTheme(ThemeDark);
        } else {
            applyTheme(ThemeLight);
        }
    }

})();
