document.addEventListener('DOMContentLoaded', function() {
    // 1. Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Menu burger responsive
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animation des barres du burger
        const bars = document.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0) translate(0)';
                bar.style.opacity = '1';
            });
        }
    });

    // 3. Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0) translate(0)';
                bar.style.opacity = '1';
            });
        });
    });

    // 4. Changement du curseur sur les liens
    document.querySelectorAll('a, button').forEach(element => {
        element.style.cursor = 'none';
        
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-pointer');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-pointer');
        });
    });

    // 5. Animation des sections avec entrée latérale
    const sections = document.querySelectorAll('section');
    
    const checkScroll = () => {
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateX(0)';
            }
        });
    };

    // Initial setup avec entrées alternées
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
        
        if (index % 2 === 0) {
            section.style.transform = 'translateX(-50px)';
        } else {
            section.style.transform = 'translateX(50px)';
        }
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // 6. Navbar qui change au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});