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

    // 7. Animation Avant/Après
    const imageWrapper = document.querySelector('.image-wrapper');
    const revealCircle = document.querySelector('.reveal-circle');
    const imageBefore = document.querySelector('.image-before');
    const resetBtn = document.getElementById('reset-btn');
    const animateBtn = document.getElementById('animate-btn');

    // Position initiale au centre
    revealCircle.style.left = '50%';
    revealCircle.style.top = '50%';

    // Fonction pour mettre à jour le mask
    const updateMask = (x, y) => {
        const rect = imageWrapper.getBoundingClientRect();
        const posX = x - rect.left;
        const posY = y - rect.top;
        
        revealCircle.style.left = `${posX}px`;
        revealCircle.style.top = `${posY}px`;
        
        // Créer un mask pour révéler l'image "après"
        imageBefore.style.clipPath = `circle(75px at ${posX}px ${posY}px)`;
    };

    // Interaction souris
    imageWrapper.addEventListener('mousemove', (e) => {
        updateMask(e.clientX, e.clientY);
    });

    // Interaction tactile
    imageWrapper.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        updateMask(touch.clientX, touch.clientY);
    });

    // Bouton Réinitialiser
    resetBtn.addEventListener('click', () => {
        imageBefore.style.clipPath = 'circle(0px at 0px 0px)';
        revealCircle.style.left = '50%';
        revealCircle.style.top = '50%';
    });

    // Bouton Animation
    animateBtn.addEventListener('click', () => {
        const wrapperRect = imageWrapper.getBoundingClientRect();
        const startX = wrapperRect.width * 0.1;
        const startY = wrapperRect.height * 0.1;
        const endX = wrapperRect.width * 0.9;
        const endY = wrapperRect.height * 0.9;
        
        // Réinitialiser avant l'animation
        imageBefore.style.clipPath = 'circle(0px at 0px 0px)';
        revealCircle.style.left = `${startX}px`;
        revealCircle.style.top = `${startY}px`;
        
        // Animation
        let progress = 0;
        const duration = 3000; // 3 secondes
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            // Courbe de progression (ease-in-out)
            const easedProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const x = startX + (endX - startX) * easedProgress;
            const y = startY + (endY - startY) * easedProgress;
            
            revealCircle.style.left = `${x}px`;
            revealCircle.style.top = `${y}px`;
            imageBefore.style.clipPath = `circle(75px at ${x}px ${y}px)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    });
});