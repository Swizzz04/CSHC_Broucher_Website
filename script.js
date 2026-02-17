// Get all navigation links
const navLinks = document.querySelectorAll('.nav-links li a');

// Function to set active link
function setActiveLink() {
    // Get current scroll position
    const scrollPosition = window.scrollY + 150;

    // Get all sections
    const sections = document.querySelectorAll('section');

    // Remove active from all links first
    navLinks.forEach(link => link.classList.remove('active'));

    // Loop through sections
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if we're in this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            
            // Find matching nav link
            const activeLink = document.querySelector(`.nav-links li a[href="#${sectionId}"]`);
            
            // Only add if link exists (prevents error)
            if (activeLink !== null) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Listen for scroll (lowercase window)
window.addEventListener('scroll', setActiveLink);

// Run on page load (lowercase window)
window.addEventListener('load', setActiveLink);

// Run when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});




document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');

    // Safety check before running
    if (hamburger && navMenu) {

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevents click from bubbling
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when nav link clicked
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });

    } else {
        // Tells us exactly what's missing
        console.log('Hamburger found:', hamburger);
        console.log('NavMenu found:', navMenu);
    }

    // ============================================
    // ACTIVE NAV LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Safety check
    if (navLinks.length > 0) {

        function setActiveLink() {
            const scrollPosition = window.scrollY + 150;
            const sections = document.querySelectorAll('section');
            let activeFound = false;

            // Remove active from all
            navLinks.forEach(link => link.classList.remove('active'));

            // Find current section
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight &&
                    !activeFound) {

                    const activeLink = document.querySelector(
                        `.nav-links li a[href="#${sectionId}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add('active');
                        activeFound = true;
                    }
                }
            });

            // Set home active when at top
            if (window.scrollY < 100) {
                navLinks.forEach(link => link.classList.remove('active'));
                const homeLink = document.querySelector(
                    '.nav-links li a[href="#home"]'
                );
                if (homeLink) {
                    homeLink.classList.add('active');
                }
            }
        }

        // Click to set active
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Scroll to update active
        window.addEventListener('scroll', setActiveLink);

        // Run once on load
        setActiveLink();

    }

});