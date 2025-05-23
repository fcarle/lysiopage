document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for sticky header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            // Ensure we don't try to highlight a non-existent 'clients' section
            if (sectionId !== 'clients' && pageYOffset >= sectionTop - 75) { 
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        // Ensure "Home" is active when at the top or if no other section is active
        if (current === '' || current === 'hero') {
            const homeLink = document.querySelector('header nav ul li a[href="#hero"]');
            if(homeLink) homeLink.classList.add('active');
        } else {
            const homeLink = document.querySelector('header nav ul li a[href="#hero"]');
            if(homeLink) homeLink.classList.remove('active');
        }
    });

    // Set initial active link (usually Home/Hero)
    const initialActiveLink = document.querySelector('header nav ul li a[href="#hero"]');
    if (initialActiveLink && window.pageYOffset < sections[0].offsetTop - 75) {
        initialActiveLink.classList.add('active');
    }

}); 