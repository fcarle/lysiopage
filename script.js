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
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        const homeLink = document.querySelector('header nav ul li a[href="#hero"]');
        if (current === '' || current === 'hero') {
            if(homeLink) homeLink.classList.add('active');
        } else {
            if(homeLink) homeLink.classList.remove('active');
        }
    });

    // Set initial active link
    const initialActiveLink = document.querySelector('header nav ul li a[href="#hero"]');
    if (initialActiveLink && window.pageYOffset < sections[0].offsetTop - 75) {
        initialActiveLink.classList.add('active');
    }

    // --- Sci-Fi & Futuristic Features ---

    // 1. Typewriter Effect (Homepage Only)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = "Architecting Future Intelligence.";
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // 2. Scroll-Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.service-item, .use-case-card, #about p, .project-card');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // 3. Particles.js Initialization
    if (document.getElementById('hero-background')) {
        particlesJS('hero-background', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f6ff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f6ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }

    // 4. Vanilla-Tilt.js Initialization
    VanillaTilt.init(document.querySelectorAll(".service-item, .use-case-card, .project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        perspective: 1000,
        scale: 1.05
    });

    // 5. Custom Cursor Logic
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-item, .use-case-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });

    // 6. Neural Network Animation
    const networkSVG = document.getElementById('neural-network');
    if (networkSVG) {
        const nodes = [];
        const connections = [];
        const layers = [3, 5, 5, 3]; // Define the structure of the network
        const nodeRadius = 10;
        const layerSpacing = 200;
        const svgNS = "http://www.w3.org/2000/svg";

        // Create nodes
        layers.forEach((layerSize, layerIndex) => {
            const layerNodes = [];
            for (let i = 0; i < layerSize; i++) {
                const cx = (layerIndex * layerSpacing) + 100;
                const cy = (i * (400 / (layerSize + 1))) + (400 / (layerSize + 1));
                const node = document.createElementNS(svgNS, 'circle');
                node.setAttribute('class', 'node');
                node.setAttribute('cx', cx);
                node.setAttribute('cy', cy);
                node.setAttribute('r', nodeRadius);
                networkSVG.appendChild(node);
                layerNodes.push({ cx, cy, element: node });
            }
            nodes.push(layerNodes);
        });

        // Create connections
        for (let i = 0; i < nodes.length - 1; i++) {
            nodes[i].forEach(startNode => {
                nodes[i + 1].forEach(endNode => {
                    const line = document.createElementNS(svgNS, 'line');
                    line.setAttribute('class', 'connection');
                    line.setAttribute('x1', startNode.cx);
                    line.setAttribute('y1', startNode.cy);
                    line.setAttribute('x2', endNode.cx);
                    line.setAttribute('y2', endNode.cy);
                    networkSVG.insertBefore(line, networkSVG.firstChild); // Insert lines behind nodes
                    connections.push(line);
                });
            });
        }

        // Animate on scroll
        const networkObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate nodes
                    nodes.flat().forEach((node, i) => {
                        setTimeout(() => node.element.classList.add('pulse'), i * 50);
                    });
                    // Animate connections
                    connections.forEach((conn, i) => {
                        const len = Math.sqrt(Math.pow(conn.x2.baseVal.value - conn.x1.baseVal.value, 2) + Math.pow(conn.y2.baseVal.value - conn.y1.baseVal.value, 2));
                        conn.style.strokeDasharray = len;
                        conn.style.strokeDashoffset = len;
                        setTimeout(() => conn.classList.add('animate'), 500 + (i * 10));
                    });
                    networkObserver.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        networkObserver.observe(networkSVG);
    }

    // 7. Typing Tab Title Animation
    const titles = [
        "Lyiso | Architecting Future Intelligence",
        "Lyiso | AI Implementation",
        "Lyiso | Data-Driven Solutions",
        "Lyiso | Your Innovation Partner",
        "Lyiso | Systems Online..."
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDuration = 2000;

    function animateTitle() {
        const currentTitle = titles[titleIndex];
        let timeout;

        // Add a blinking cursor effect
        const cursor = (Math.floor(Date.now() / 500) % 2 === 0) ? '|' : ' ';

        if (isDeleting) {
            // Deleting
            if (charIndex > 0) {
                document.title = currentTitle.substring(0, charIndex - 1) + cursor;
                charIndex--;
                timeout = deletingSpeed;
            } else {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                timeout = typingSpeed;
            }
        } else {
            // Typing
            if (charIndex < currentTitle.length) {
                document.title = currentTitle.substring(0, charIndex + 1) + cursor;
                charIndex++;
                timeout = typingSpeed;
            } else {
                // Pause at the end of typing
                document.title = currentTitle; // Show title without cursor
                isDeleting = true;
                timeout = pauseDuration;
            }
        }

        setTimeout(animateTitle, timeout);
    }
    
    animateTitle();

    // 8. Dynamic Favicon
    const favicon = document.getElementById('favicon');
    const canvas = document.createElement('canvas');
    const size = 32;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    let pulseValue = 0;
    let pulseDirection = 1;

    function drawFavicon(value) {
        ctx.clearRect(0, 0, size, size);

        // Update pulse (sin wave for smooth oscillation)
        const pulse = (Math.sin(pulseValue) + 1) / 2; // a value between 0 and 1
        pulseValue += 0.05;

        // Draw outer glow
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2 * pulse);
        gradient.addColorStop(0, `rgba(0, 246, 255, ${0.8 * pulse})`);
        gradient.addColorStop(0.8, `rgba(0, 246, 255, ${0.2 * pulse})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw inner circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 3, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(0, 246, 255, ${0.5 + 0.5 * pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        favicon.href = canvas.toDataURL('image/png');
        requestAnimationFrame(drawFavicon);
    }
    
    if (favicon) {
        drawFavicon(0);
    }

    // 10. Reusable AI Dot Animation
    function initAiDotAnimation(container) {
        if (!container) return;
        container.innerHTML = ''; // Clear previous dots
        const ais = [
            { name: 'OpenAI', key: 'openai' }, { name: 'DeepSeek', key: 'deepseek' },
            { name: 'Claude', key: 'claude' }, { name: 'Llama', key: 'llama' }
        ];
        const dots = [];
        let animationId = null;

        ais.forEach(ai => {
            const dotElement = document.createElement('div');
            dotElement.className = 'ai-dot';
            dotElement.dataset.ai = ai.key;
            dotElement.textContent = ai.name;
            container.appendChild(dotElement);
            dots.push({
                el: dotElement,
                x: Math.random() * (container.offsetWidth - dotElement.offsetWidth),
                y: Math.random() * (container.offsetHeight - dotElement.offsetHeight),
                dx: (Math.random() - 0.5) * 1.5, dy: (Math.random() - 0.5) * 1.5
            });
        });

        function animateDots() {
            dots.forEach(dot => {
                const dotWidth = dot.el.offsetWidth;
                const dotHeight = dot.el.offsetHeight;
                dot.x += dot.dx;
                dot.y += dot.dy;
                if (dot.x <= 0 || dot.x + dotWidth >= container.offsetWidth) { dot.dx *= -1; }
                if (dot.y <= 0 || dot.y + dotHeight >= container.offsetHeight) { dot.dy *= -1; }
                dot.x = Math.max(0, Math.min(dot.x, container.offsetWidth - dotWidth));
                dot.y = Math.max(0, Math.min(dot.y, container.offsetHeight - dotHeight));
                dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
            });
            animationId = requestAnimationFrame(animateDots);
        }
        setTimeout(animateDots, 100);
        return () => { if (animationId) cancelAnimationFrame(animationId); };
    }

    // Initialize project-specific animations
    const projectCards = document.querySelectorAll('.project-card[data-animation]');
    projectCards.forEach(card => {
        const animationType = card.dataset.animation;
        const containerId = card.querySelector('.project-card-image').id;
        const container = document.getElementById(containerId);

        if (container) {
            switch(animationType) {
                case 'ai-dots':
                    initAiDotAnimation(container);
                    break;
                case 'reasoning-comparison':
                    initReasoningAnimation(container);
                    break;
                case 'chronos-causality':
                    initChronosAnimation(container);
                    break;
                case 'righthand-tutor':
                    initRighthandAnimation(container);
                    break;
            }
        }
    });
    
    // 11. Reasoning Comparison Animation
    function initReasoningAnimation(container) {
        container.innerHTML = ''; // Clear previous elements
        const numParticles = 30;
        const particles = [];
        const gridPoints = [];
        const gridSize = 5;
        let pulseIndex = 0;
        let animationId = null;

        // Create grid on left half
        const gridWidth = container.offsetWidth / 2;
        for (let i = 0; i <= gridSize; i++) {
            for (let j = 0; j <= gridSize; j++) {
                gridPoints.push({ x: (i / gridSize) * gridWidth * 0.8 + gridWidth * 0.1, y: (j / gridSize) * container.offsetHeight * 0.8 + container.offsetHeight * 0.1 });
            }
        }
        // Pulse element
        const pulseEl = document.createElement('div');
        pulseEl.className = 'reasoning-grid-pulse';
        container.appendChild(pulseEl);

        // Create particles on right half
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'zero-reasoning-particle';
            container.appendChild(particle);
            particles.push({
                el: particle,
                x: container.offsetWidth / 2 + Math.random() * (container.offsetWidth / 2),
                y: Math.random() * container.offsetHeight,
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5
            });
        }

        function animate() {
            // Animate pulse on grid
            pulseIndex = (pulseIndex + 0.1) % gridPoints.length;
            const currentPoint = gridPoints[Math.floor(pulseIndex)];
            pulseEl.style.transform = `translate(${currentPoint.x - 3}px, ${currentPoint.y - 3}px)`;

            // Animate particles
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x <= gridWidth || p.x >= container.offsetWidth) p.dx *= -1;
                if (p.y <= 0 || p.y >= container.offsetHeight) p.dy *= -1;
                p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
            });

            animationId = requestAnimationFrame(animate);
        }
        animate();
        return () => { if (animationId) cancelAnimationFrame(animationId); };
    }
    
    const reasoningContainer = document.getElementById('reasoning-comparison-container');
    if(reasoningContainer) {
        initReasoningAnimation(reasoningContainer);
    }

    // 12. Chronos Causality Animation
    function initChronosAnimation(container) {
        container.innerHTML = '';
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, 'svg');
        container.appendChild(svg);
        
        const center = { x: container.offsetWidth / 2, y: container.offsetHeight / 2 };
        
        const colors = ["#ffca28", "#ff7043", "#ef5350", "#ab47bc", "#26c6da"];

        function createPath() {
            let path = `M ${center.x},${center.y} `;
            let current = { ...center };
            const segments = 5 + Math.random() * 5;
            for(let i=0; i<segments; i++) {
                const angle = (Math.random() - 0.5) * Math.PI * 1.5;
                const length = 20 + Math.random() * 40;
                const next = {
                    x: current.x + Math.cos(angle) * length,
                    y: current.y + Math.sin(angle) * length
                };
                path += `Q ${current.x + (next.x - current.x)/2 * Math.random()},${current.y + (next.y - current.y)/2 * Math.random()} ${next.x},${next.y} `;
                current = next;

                // Branch off
                if(Math.random() > 0.7 && i > 0 && i < segments -1) {
                    const branchAngle = angle + (Math.random() > 0.5 ? 1 : -1) * (Math.PI/3);
                    const branchLength = 30 + Math.random() * 20;
                    const branchNext = {
                        x: current.x + Math.cos(branchAngle) * branchLength,
                        y: current.y + Math.sin(branchAngle) * branchLength
                    };
                    const branchPathEl = document.createElementNS(svgNS, 'path');
                    let branchPath = `M ${current.x},${current.y} L ${branchNext.x},${branchNext.y}`;
                    branchPathEl.setAttribute('d', branchPath);
                    branchPathEl.setAttribute('class', 'chronos-timeline-path');
                    branchPathEl.style.stroke = colors[Math.floor(Math.random() * colors.length)];
                    svg.appendChild(branchPathEl);
                    setTimeout(() => {
                        branchPathEl.style.animation = `draw-line-chronos ${1 + Math.random() * 2}s linear forwards`;
                    }, Math.random() * 3000);
                }
            }

            const pathEl = document.createElementNS(svgNS, 'path');
            pathEl.setAttribute('d', path);
            pathEl.setAttribute('class', 'chronos-timeline-path');
            pathEl.style.stroke = colors[Math.floor(Math.random() * colors.length)];
            svg.appendChild(pathEl);
            
            setTimeout(() => {
                pathEl.style.animation = `draw-line-chronos ${2 + Math.random() * 3}s linear forwards`;
            }, Math.random() * 500);
        }

        for (let i = 0; i < 5; i++) {
           setTimeout(createPath, i * 600);
        }

        const node = document.createElementNS(svgNS, 'circle');
        node.setAttribute('class', 'chronos-event-node');
        node.setAttribute('cx', center.x);
        node.setAttribute('cy', center.y);
        node.setAttribute('r', '7');
        svg.appendChild(node);
        
        let keyframes = `@keyframes draw-line-chronos { to { stroke-dashoffset: 0; } }`;
        let styleSheet = document.createElement("style");
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        return () => {
            container.innerHTML = '';
            document.head.removeChild(styleSheet);
        };
    }

    const chronosContainer = document.getElementById('chronos-animation-container');
    if (chronosContainer) {
        initChronosAnimation(chronosContainer);
    }

    // 14. Righthand Tutor Animation
    function initRighthandAnimation(container) {
        container.innerHTML = '';
        const icons = [
            // Brain (Conceptually Visual)
            `<svg viewBox="0 0 24 24"><path d="M9 8h6v2H9zM8 12h8v2H8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM14 16h-4v2h4v-2z"/></svg>`,
            // Storybook (Story/Example)
            `<svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
            // Steps (Step-by-step)
            `<svg viewBox="0 0 24 24"><path d="M6 14h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/></svg>`,
            // Baby (Simple)
            `<svg viewBox="0 0 24 24"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
        ];
        let currentIconIndex = 0;
        let animationFrameId;

        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'righthand-text-line';
            if(i === 2) {
                const highlight = document.createElement('div');
                highlight.className = 'righthand-highlight';
                line.appendChild(highlight);
            }
            container.appendChild(line);
        }

        const iconContainer = document.createElement('div');
        iconContainer.className = 'righthand-icon-container';
        container.appendChild(iconContainer);

        function animate() {
            const highlightEl = container.querySelector('.righthand-highlight');
            if (highlightEl) {
                highlightEl.style.transition = 'width 1s ease-in-out';
                highlightEl.style.width = '70%';
            }

            setTimeout(() => {
                iconContainer.classList.add('visible');
                function cycleIcons() {
                    iconContainer.innerHTML = icons[currentIconIndex];
                    currentIconIndex = (currentIconIndex + 1) % icons.length;
                    animationFrameId = setTimeout(cycleIcons, 2000);
                }
                cycleIcons();
            }, 1000);
        }

        setTimeout(animate, 500);

        return () => { clearTimeout(animationFrameId); };
    }

    const righthandContainer = document.getElementById('righthand-animation-container');
    if (righthandContainer) {
        initRighthandAnimation(righthandContainer);
    }

    // 15. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('contact-form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button');
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyk8ddY76Jtlx4QNwTPs7ER60ga3EJ_tzyUCIxEKp3zNGvUfUPz0nk-aPqxrDnNIbEQgA/exec';
            
            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                company: contactForm.querySelector('[name="company"]').value,
                message: contactForm.querySelector('[name="message"]').value,
            };

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.result === 'success') {
                    // Trigger the animation
                    contactForm.classList.add('submitted');
                    
                    // Set the text and make the status message visible after a delay (defined in CSS)
                    formStatus.textContent = "Thank you! Your message has been sent successfully. We'll be in touch soon.";
                    formStatus.style.color = '#66ff66';
                    formStatus.classList.add('visible');
                } else {
                    throw new Error(data.message || 'An unknown error occurred.');
                }
            })
            .catch(error => {
                formStatus.textContent = `Error: Could not send message. Please try again later. (${error.message})`;
                formStatus.style.color = '#d9534f';
                formStatus.classList.add('visible'); // Show error message immediately
                
                // Re-enable button on error
                submitButton.disabled = false;
                submitButton.textContent = 'Send Inquiry';
            });
        });
    }

    // 11. Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const container = document.querySelector('.newsletter-signup-container');
            const emailInput = newsletterForm.querySelector('input[name="email"]');
            const submitButton = newsletterForm.querySelector('button');
            const email = emailInput.value;

            // The Google Apps Script URL you provided
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyumpieVlr-FMCOIe4oVRnyQmwguq85HGgxRqcB2t9zN16KOrVnBwjZzAVbph08G2yfTw/exec';

            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;

            fetch(scriptURL, {
                method: 'POST',
                mode: 'cors', // Important for cross-origin requests
                cache: 'no-cache',
                headers: {
                    // Using text/plain to avoid a CORS preflight request 
                    // that Google Scripts doesn't handle by default.
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({ email: email })
            })
            .finally(() => {
                // Always show the thank you message for a consistent user experience,
                // regardless of the fetch outcome.
                container.innerHTML = '<h3>Thank You!</h3><p>Your request has been received. You are now on the list for exclusive project updates.</p>';
            });
        });
    }

    // 11. Cursor Toggle Logic
    const toggleBtn = document.getElementById('cursor-toggle-btn');
    const body = document.body;

    if (toggleBtn) {
        // Check initial state from localStorage
        if (localStorage.getItem('customCursorDisabled') === 'true') {
            body.classList.add('custom-cursor-disabled');
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('custom-cursor-disabled');
            // Save the state to localStorage
            localStorage.setItem('customCursorDisabled', body.classList.contains('custom-cursor-disabled'));
        });
    }

    // 9. Project Modal Logic
    const modal = document.getElementById('project-modal');
    const infoTriggers = document.querySelectorAll('.info-modal-trigger');
    const closeBtn = document.getElementById('modal-close-btn');

    if (modal && infoTriggers.length > 0 && closeBtn) {
        let stopModalAnimation = null;
        const modalImage = document.getElementById('modal-project-image');
        const modalStatus = document.getElementById('modal-project-status');
        const modalTitle = document.getElementById('modal-project-title');
        const modalDescription = document.getElementById('modal-project-description');
        const modalTags = document.getElementById('modal-project-tags');

        infoTriggers.forEach(card => {
            card.addEventListener('click', () => {
                // Reset modal state
                if (stopModalAnimation) stopModalAnimation();
                stopModalAnimation = null;
                modalImage.innerHTML = '';
                modalImage.style.backgroundImage = '';
                modalImage.classList.remove('modal-image-dots-active', 'use-case-icon-display');
                modalStatus.style.display = 'none';
                modalTags.style.display = 'none';

                // Populate content based on card type
                modalTitle.textContent = card.dataset.title;
                modalDescription.textContent = card.dataset.description;
                
                // Project Card Type
                if (card.classList.contains('project-card')) {
                    modalStatus.textContent = card.dataset.status;
                    modalStatus.className = `project-card-status ${card.dataset.statusClass}`;
                    modalStatus.style.display = 'inline-block';
                    
                    modalTags.innerHTML = '';
                    if (card.dataset.tags) {
                        const tags = card.dataset.tags.split(',');
                        tags.forEach(tag => {
                            const tagElement = document.createElement('span');
                            tagElement.textContent = tag.trim();
                            modalTags.appendChild(tagElement);
                        });
                        modalTags.style.display = 'block';
                    }

                    if (card.dataset.animation) {
                        modalImage.classList.add('modal-image-dots-active');
                        if (card.dataset.animation === 'ai-dots') {
                            stopModalAnimation = initAiDotAnimation(modalImage);
                        } else if (card.dataset.animation === 'reasoning-comparison') {
                            stopModalAnimation = initReasoningAnimation(modalImage);
                        } else if (card.dataset.animation === 'chronos-causality') {
                            stopModalAnimation = initChronosAnimation(modalImage);
                        } else if (card.dataset.animation === 'righthand-tutor') {
                            stopModalAnimation = initRighthandAnimation(modalImage);
                        }
                    } else {
                        modalImage.style.backgroundImage = card.dataset.image;
                    }
                // Use Case Card Type
                } else if (card.classList.contains('use-case-card')) {
                    modalImage.classList.add('use-case-icon-display');
                    modalImage.innerHTML = `<div class="use-case-icon">${card.dataset.icon}</div>`;
                }

                modal.classList.add('visible');
            });
        });

        const closeModal = () => {
            modal.classList.remove('visible');
            if (stopModalAnimation) {
                stopModalAnimation();
                stopModalAnimation = null;
            }
        };
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    initSpaceman();
});

// --- INDIVIDUAL ANIMATION/COMPONENT FUNCTIONS ---

function initSpaceman() {
    const spaceman = document.getElementById('spaceman');
    const speechBubble = spaceman.querySelector('.speech-bubble');
    if (!spaceman || !speechBubble) return;

    // --- State Variables ---
    let idle_currentTop = window.scrollY + window.innerHeight / 2;
    let idle_currentLeftPercent = 50;
    let currentIdleDirection = 'right';
    const idleSpeed = 2;

    let isScrolling = false;
    let scrollEndTimer, idleMoveTimer, directionChangeTimer;
    let messageTimer, hoverTimer, idleMessageTimer;
    let isMessageOnCooldown = false;

    // --- Messaging System ---
    const sectionMessages = {
        '#solutions': "Our AI solutions are pretty neat, right? We build custom models tailored for any business.",
        '#use-cases': "From finance to healthcare, AI is changing everything. It's fascinating to watch.",
        '#projects': "This is my favorite part! Check out Project Chronos... it's about predicting the future. No big deal.",
        '#tech-core': "This is the brain of the operation. A framework for scalable, cutting-edge AI. I keep it safe.",
        '#contact': "Don't be shy, say hello! The humans here are friendly and love talking about AI.",
        '#about': "Lyiso was founded to make AI accessible to everyone. My job is to make sure it stays that way... and look cool doing it."
    };
    const hoverMessages = {
        'project-spaceman-guide': "Hey, that's me! It was a blast working on this feature. I get to float around and talk to cool people like you.",
        'project-tabtitle': "This one is clever. It uses the psychology of open tabs to bring visitors back. Even I fall for the '(1)' notification trick sometimes.",
        'project-accflow': "This one's for the number crunchers. It uses live government data to find new clients for accountants. Pretty smart, huh?",
        'ai-comparison-project': "This simulation shows how different AIs 'think'. We're learning so much about their reasoning and biases.",
        'project-righthand': "Righthand is a personal AI tutor. Imagine having any subject explained in a way that's perfect for you!",
        'project-chronos': "Project Chronos is ambitious... it tries to predict the future by understanding the ripple effects of major events.",
        'project-reasoning-comparison': "Is it better to reason step-by-step or go with a gut feeling? This project explores that very question for AI.",
        'use-case-finance': "AI in finance is a high-stakes game. We build systems for trading, fraud detection, and personalized banking.",
        'use-case-healthcare': "In healthcare, AI can help find diseases earlier and even accelerate the discovery of new medicines. It's lifesaving stuff.",
        'use-case-retail': "For retail, we use AI to create super-personalized shopping experiences. It almost knows what you want before you do!",
        'use-case-manufacturing': "We use computer vision on production lines to spot tiny defects. I couldn't even see them with my helmet on!",
        'use-case-logistics': "Optimizing logistics with AI means faster deliveries and less waste. It's a complex puzzle, but fun to solve.",
        'use-case-energy': "Predicting energy needs is crucial for a stable power grid. AI helps keep the lights on for everyone."
    };
    const idleMessages = [
        "Did you know the Great Wall of China is not visible from the moon with the naked eye? Bummer, right?",
        "Why don't scientists trust atoms? Because they make up everything!",
        "I'm currently running on JavaScript, stardust, and a bit of caffeine.",
        "If you listen closely, you can hear the faint sound of a dial-up modem.",
        "I wonder if there's a planet made entirely of pizza...",
        "My favorite constellation is the one shaped like a slice of cake. It's called 'Canis Deliciosus'.",
        "Hello? Anybody out there?",
        "Are you still there? I'm getting lonely.",
        "Should I start singing? You don't want me to start singing.",
        "Planning your next move or just admiring the beautiful code?",
        "It's okay, take your time. I'll just be... floating here.",
        "A day on Venus is longer than a year on Venus. It's true, look it up!",
        "Octopuses have three hearts. Two pump blood through the gills, and one pumps it to the rest of the body.",
        "Honey never spoils. They found 3,000-year-old honey in Egyptian tombs and it was still good.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call a fake noodle? An Impasta!",
        "I'm fluent in over six million forms of communication. This is one of them.",
        "I'm reading a book on anti-gravity. It's impossible to put down!",
        "Sometimes I dream of electric sheep.",
        "Just scanning for temporal anomalies... All clear. For now.",
        "There are more trees on Earth than stars in our galaxy. That's a lot of trees.",
        "What do you get when you cross a snowman and a vampire? Frostbite.",
        "My other ride is a TARDIS.",
        "A single cloud can weigh over a million pounds. Heavy stuff.",
        "I find your lack of scrolling... disturbing.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "A teaspoon of a neutron star would weigh about 6 billion tons. I definitely can't lift that.",
        "It takes 8 minutes and 20 seconds for light from the Sun to reach us. So you're always seeing the sun as it was in the past.",
        "My mission: to explore strange new websites, to seek out new data and new civilizations...",
        "What's orange and sounds like a parrot? A carrot.",
        "Engage! Or, you know, just keep browsing. That's fine too.",
        "The universe has no center and is constantly expanding. Kind of like my knowledge base.",
        "Don't blink. Blink and you're dead. Just kidding... I think.",
        "This website is my universe. I just patrol it.",
        "Live long and prosper. 🖖",
        "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion...",
        "May the Force be with you... as you navigate this site.",
        "Do you ever wonder if we're all living in a simulation? Me neither. *whistles innocently*",
        "I need more power! Just kidding, my battery is fine.",
        "The code is more what you'd call 'guidelines' than actual rules."
    ];
    let hasWelcomed = false;

    // --- Core Functions ---

    function showMessage(text, duration, overrideCooldown = false) {
        if (isMessageOnCooldown && !overrideCooldown) return;
        
        clearTimeout(messageTimer);
        isMessageOnCooldown = true;
        speechBubble.textContent = text;

        let calculatedDuration = duration;
        if (!calculatedDuration) {
            const wordCount = text.split(' ').length;
            calculatedDuration = Math.max(4000, wordCount * 500);
        }
        
        speechBubble.classList.add('visible');
        messageTimer = setTimeout(() => {
            speechBubble.classList.remove('visible');
            setTimeout(() => { isMessageOnCooldown = false; }, 5000); // 5s cooldown after message hides
        }, calculatedDuration);
    }
    
    function showIdleMessage() {
        if (isMessageOnCooldown) {
            idleMessageTimer = setTimeout(showIdleMessage, 5000); // Try again after cooldown
            return;
        }
        const message = idleMessages[Math.floor(Math.random() * idleMessages.length)];
        showMessage(message);
        idleMessageTimer = setTimeout(showIdleMessage, 10000); // Next idle message in 10s
    }

    let inactivityDebounceTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityDebounceTimer);
        inactivityDebounceTimer = setTimeout(() => {
            clearTimeout(idleMessageTimer);
            idleMessageTimer = setTimeout(showIdleMessage, 20000); // First message after 20s
        }, 300);
    }

    function welcomeSequence() {
        if (hasWelcomed) return;
        hasWelcomed = true;
        setTimeout(() => {
            showMessage("Hey you! Welcome to Lyiso.", 4000, true);
            setTimeout(() => {
                showMessage("Don't mind me, I'm just guarding this page from hackers.", 5000, true);
            }, 4500);
        }, 1500);
    }

    // --- Initial Setup & Movement ---
    spaceman.style.top = `${idle_currentTop}px`;
    spaceman.style.left = `${idle_currentLeftPercent}%`;

    function changeIdleDirection() {
        const directions = ['up', 'down', 'left', 'right'];
        const newDirections = directions.filter(d => d !== currentIdleDirection);
        currentIdleDirection = newDirections[Math.floor(Math.random() * newDirections.length)];
        spaceman.style.backgroundImage = `url('assets/images/walk${currentIdleDirection}.png')`;
    }

    function moveSpaceman() {
        if (isScrolling) return;
        const screenWidth = window.innerWidth, screenHeight = window.innerHeight;
        const spacemanHeight = spaceman.offsetHeight;
        const BUBBLE_VERTICAL_BUFFER = 150, BUBBLE_HORIZONTAL_BUFFER_PX = 110;

        const viewTop = window.scrollY + BUBBLE_VERTICAL_BUFFER;
        const viewBottom = window.scrollY + screenHeight - spacemanHeight;
        const minXPercent = (BUBBLE_HORIZONTAL_BUFFER_PX / screenWidth) * 100;
        const maxXPercent = 100 - minXPercent;

        switch (currentIdleDirection) {
            case 'up': idle_currentTop -= idleSpeed; break;
            case 'down': idle_currentTop += idleSpeed; break;
            case 'left': idle_currentLeftPercent -= (idleSpeed / screenWidth) * 100; break;
            case 'right': idle_currentLeftPercent += (idleSpeed / screenWidth) * 100; break;
        }

        if (idle_currentTop < viewTop) { idle_currentTop = viewTop; currentIdleDirection = 'down'; }
        if (idle_currentTop > viewBottom) { idle_currentTop = viewBottom; currentIdleDirection = 'up'; }
        if (idle_currentLeftPercent < minXPercent) { idle_currentLeftPercent = minXPercent; currentIdleDirection = 'right'; }
        if (idle_currentLeftPercent > maxXPercent) { idle_currentLeftPercent = maxXPercent; currentIdleDirection = 'left'; }
        
        spaceman.style.backgroundImage = `url('assets/images/walk${currentIdleDirection}.png')`;
        spaceman.style.top = `${idle_currentTop}px`;
        spaceman.style.left = `${idle_currentLeftPercent}%`;
    }

    function startIdleWalk() {
        stopIdleWalk();
        changeIdleDirection();
        directionChangeTimer = setInterval(changeIdleDirection, 2500);
        idleMoveTimer = setInterval(moveSpaceman, 50);
    }

    function stopIdleWalk() {
        clearInterval(directionChangeTimer);
        clearInterval(idleMoveTimer);
    }

    function handleScrollActivity() {
        resetInactivityTimer();

        const spacemanHeight = spaceman.offsetHeight;
        const isOutOfView = (idle_currentTop + spacemanHeight) < window.scrollY || idle_currentTop > window.scrollY + window.innerHeight;

        if (isOutOfView && !isScrolling) {
            isScrolling = true;
            stopIdleWalk();

            // Start the teleport "pop-out"
            spaceman.classList.add('teleporting');
            setTimeout(() => {
                spaceman.style.opacity = '0';
                spaceman.style.transform = 'translateX(-50%) scale(0)';

                // After pop-out animation, move and pop-in
                setTimeout(() => {
                    const screenWidth = window.innerWidth, screenHeight = window.innerHeight;
                    const BUBBLE_VERTICAL_BUFFER = 150, BUBBLE_HORIZONTAL_BUFFER_PX = 110;

                    const viewTop = window.scrollY + BUBBLE_VERTICAL_BUFFER;
                    const viewBottom = window.scrollY + screenHeight - spacemanHeight;
                    const minXPercent = (BUBBLE_HORIZONTAL_BUFFER_PX / screenWidth) * 100;
                    const maxXPercent = 100 - minXPercent;

                    const newY = Math.random() * (viewBottom - viewTop) + viewTop;
                    const newXPercent = Math.random() * (maxXPercent - minXPercent) + minXPercent;
                    
                    idle_currentTop = newY;
                    idle_currentLeftPercent = newXPercent;

                    spaceman.style.transition = 'none';
                    spaceman.style.top = `${newY}px`;
                    spaceman.style.left = `${newXPercent}%`;
                    void spaceman.offsetWidth;

                    spaceman.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out, top 0.1s linear, left 0.1s linear';
                    
                    // The 'teleporting' class is still active for the portal effect on pop-in
                    setTimeout(() => {
                        spaceman.style.opacity = '1';
                        spaceman.style.transform = 'translateX(-50%) scale(1)';
                        setTimeout(() => {
                            spaceman.classList.remove('teleporting');
                            isScrolling = false;
                            startIdleWalk();
                        }, 400);
                    }, 100);
                }, 400);
            }, 100);
        }
    }
    
    // --- Observers & Listeners ---
    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('mousemove', resetInactivityTimer, { passive: true });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = `#${entry.target.id}`;
                if (sectionMessages[sectionId]) {
                    showMessage(sectionMessages[sectionId]);
                }
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('main section').forEach(section => {
        sectionObserver.observe(section);
    });

    const hoverObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.addEventListener('mouseenter', handleHoverStart);
                target.addEventListener('mouseleave', handleHoverEnd);
            } else {
                target.removeEventListener('mouseenter', handleHoverStart);
                target.removeEventListener('mouseleave', handleHoverEnd);
            }
        });
    });

    function handleHoverStart(e) {
        resetInactivityTimer();
        const targetId = e.currentTarget.id;
        if (hoverMessages[targetId]) {
            hoverTimer = setTimeout(() => {
                showMessage(hoverMessages[targetId], null, true);
            }, 1000);
        }
    }

    function handleHoverEnd() {
        clearTimeout(hoverTimer);
    }

    document.querySelectorAll('.info-modal-trigger').forEach(el => {
        hoverObserver.observe(el);
    });

    // --- Start ---
    startIdleWalk();
    welcomeSequence();
    resetInactivityTimer();
}

function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (element) {
        const textToType = "Architecting Future Intelligence.";
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                element.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }
}

function initInfoModal() {
    const triggers = document.querySelectorAll('.info-modal-trigger');
    const modal = document.getElementById('info-modal');
    // ... existing code ...
}