// Niuverse - Galaxy + Robot Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate stat numbers
    animateStats();
    
    // Add parallax effect
    initParallax();
    
    // Add card interactions
    initCardEffects();
    
    // Typing effect for terminal
    initTerminalTyping();
});

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateNumber(target, count);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Parallax effect for stars and orbits
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const stars = document.querySelector('.stars');
        const stars2 = document.querySelector('.stars2');
        const orbits = document.querySelectorAll('.orbit');
        
        if (stars) {
            stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
        if (stars2) {
            stars2.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
        }
        
        orbits.forEach((orbit, index) => {
            const speed = (index + 1) * 5;
            orbit.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
        });
    });
}

// Terminal typing effect
function initTerminalTyping() {
    const commands = [
        { cmd: 'ls projects/', delay: 1000 },
        { cmd: 'cat about.txt', delay: 2000 },
        { cmd: 'echo "Welcome to Niuverse"', delay: 3000 }
    ];
    
    let index = 0;
    
    function typeNextCommand() {
        if (index >= commands.length) {
            index = 0;
        }
        
        const { cmd, delay } = commands[index];
        const cursor = document.querySelector('.typing-cursor');
        
        if (cursor) {
            cursor.textContent = cmd;
            cursor.classList.remove('typing-cursor');
            
            setTimeout(() => {
                cursor.classList.add('typing-cursor');
                cursor.textContent = '_';
                index++;
                setTimeout(typeNextCommand, delay);
            }, 2000);
        }
    }
    
    setTimeout(typeNextCommand, 3000);
}

// Glitch effect randomizer
setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch && Math.random() > 0.95) {
        glitch.style.textShadow = `
            ${Math.random() * 10 - 5}px 0 #00d4ff,
            ${Math.random() * 10 - 5}px 0 #ff00ff
        `;
        setTimeout(() => {
            glitch.style.textShadow = '0 0 30px rgba(0,212,255,0.5)';
        }, 100);
    }
}, 100);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
