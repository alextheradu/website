document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggle.checked = true;
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggle.checked = false;
    }

    // Toggle dark mode
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
