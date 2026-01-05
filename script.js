 // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Show/Hide Work Navigation Controls
        const workSection = document.getElementById('work');
        const workNavButtons = document.querySelector('.work-nav-buttons');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        const workObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    workNavButtons.classList.add('visible');
                    scrollIndicator.classList.add('visible');
                } else {
                    workNavButtons.classList.remove('visible');
                    scrollIndicator.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.5
        });

        if (workSection) {
            workObserver.observe(workSection);
        }

        // Smooth Scroll for Navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement && targetId !== 'work') {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Skills Animation on Scroll
        const skillsSection = document.getElementById('skills');
        let skillsAnimated = false;

        const observerOptions = {
            threshold: 0.3
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkills();
                    skillsAnimated = true;
                }
            });
        }, observerOptions);

        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }

        function animateSkills() {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
        }

        // Horizontal Scroll for Work Section
        const workScroll = document.getElementById('workScroll');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSection = 0;

        function scrollToSection(index) {
            const sectionWidth = workScroll.offsetWidth;
            workScroll.scrollTo({
                left: sectionWidth * index,
                behavior: 'smooth'
            });
            currentSection = index;
            updateDots();
        }

        function updateDots() {
            scrollDots.forEach((dot, index) => {
                if (index === currentSection) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSection > 0) {
                    scrollToSection(currentSection - 1);
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentSection < 3) {
                    scrollToSection(currentSection + 1);
                }
            });
        }

        // Update active dot on scroll
        if (workScroll) {
            workScroll.addEventListener('scroll', () => {
                const scrollPosition = workScroll.scrollLeft;
                const sectionWidth = workScroll.offsetWidth;
                currentSection = Math.round(scrollPosition / sectionWidth);
                updateDots();
            });

            // Click dots to navigate
            scrollDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    scrollToSection(index);
                });
            });
        }

        // Keyboard navigation for work section
        document.addEventListener('keydown', (e) => {
            if (!workSection) return;
            
            // Check if work section is visible
            const rect = workSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible) return;

            if (e.key === 'ArrowRight' && currentSection < 3) {
                scrollToSection(currentSection + 1);
            } else if (e.key === 'ArrowLeft' && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        });

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = e.target.name.value;
                const email = e.target.email.value;
                const message = e.target.message.value;
                
                // Create mailto link
                const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                window.location.href = `mailto:jay.joshi@example.com?subject=${subject}&body=${body}`;
                
                alert('Thank you for your message! Your email client will open.');
                contactForm.reset();
            });
        }