document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const githubIcon = document.getElementById('githubIcon');

    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggle.checked = true;
        githubIcon.src = '/images/github-mark.png'; // Dark mode icon
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggle.checked = false;
        githubIcon.src = '/images/github-mark-white.png'; // Light mode icon
    }

    // Toggle dark mode
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('darkMode', 'enabled');
            githubIcon.src = '/images/github-mark.png'; // Dark mode icon
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            githubIcon.src = '/images/github-mark-white.png'; // Light mode icon
        }
    });

    let clickCount = 0;
    const heading = document.querySelector('h1');

    heading.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            window.location.href = 'https://www.youtube.com/@StraightOuttaGlendale';
        }
    });
});
