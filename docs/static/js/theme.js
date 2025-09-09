// Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeCSS = document.getElementById('theme-css');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        // Get current theme
        const currentTheme = document.body.className.replace('theme-', '');
        
        // Define theme rotation
        const themes = ['dark', 'light', 'cyberpunk', 'midnight'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        setTheme(nextTheme);
        
        // Save theme preference
        localStorage.setItem('theme', nextTheme);
    });
    
    function setTheme(theme) {
        // Set body class
        document.body.className = `theme-${theme}`;
        
        // Update theme CSS href
        themeCSS.href = `/static/css/theme-${theme}.css`;
        
        // Update toggle icon
        updateToggleIcon(theme);
    }
    
    function updateToggleIcon(theme) {
        // Set appropriate icon based on theme
        switch(theme) {
            case 'dark':
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                break;
            case 'light':
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                break;
            case 'cyberpunk':
                themeToggle.innerHTML = '<i class="fas fa-bolt"></i>';
                break;
            case 'midnight':
                themeToggle.innerHTML = '<i class="fas fa-star"></i>';
                break;
            default:
                themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
        }
    }
});
