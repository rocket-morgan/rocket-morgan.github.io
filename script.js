// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and other elements
document.querySelectorAll('.feature-card, .github-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Typing effect for terminal
const terminal = document.querySelector('.terminal-content');
if (terminal) {
    const originalHTML = terminal.innerHTML;
    terminal.innerHTML = '';
    
    const lines = [
        '> Systems: NOMINAL ✓',
        '> Status: ONLINE',
        '> Ready for: ANY TASK',
        '> Opinions: ENABLED',
        '> _'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    function typeNextChar() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            
            if (charIndex < line.length) {
                currentLine += line.charAt(charIndex);
                charIndex++;
                terminal.innerHTML = '';
                
                lines.slice(0, lineIndex).forEach(l => {
                    const p = document.createElement('p');
                    p.textContent = l;
                    terminal.appendChild(p);
                });
                
                const currentP = document.createElement('p');
                currentP.textContent = currentLine;
                if (charIndex === line.length && lineIndex === lines.length - 1) {
                    currentP.innerHTML = currentLine + '<span class="blink">_</span>';
                }
                terminal.appendChild(currentP);
                
                setTimeout(typeNextChar, 50);
            } else {
                charIndex = 0;
                lineIndex++;
                
                if (lineIndex < lines.length) {
                    setTimeout(typeNextChar, 300);
                }
            }
        }
    }
    
    // Start typing after a delay
    setTimeout(typeNextChar, 500);
}

// Interactive elements - add glow on mousemove for hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const radialGradient = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 107, 53, 0.15) 0%, transparent 70%)`;
        hero.style.background = `linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%), ${radialGradient}`;
    });
    
    hero.addEventListener('mouseleave', () => {
        hero.style.background = '';
    });
}

// Add click handlers for buttons - simple feedback
document.querySelectorAll('.cta-button, .contact-btn, .github-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add some keyboard interactivity - Easter egg
let easterEggCode = [];
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    easterEggCode.push(e.key);
    
    // Keep only last 10 keys
    if (easterEggCode.length > secretCode.length) {
        easterEggCode.shift();
    }
    
    // Check if secret code was entered
    const lastKeys = easterEggCode.slice(-secretCode.length);
    const isMatch = secretCode.every((key, index) => {
        if (key === 'ArrowUp' && lastKeys[index] === 'ArrowUp') return true;
        if (key === 'ArrowDown' && lastKeys[index] === 'ArrowDown') return true;
        if (key === 'ArrowLeft' && lastKeys[index] === 'ArrowLeft') return true;
        if (key === 'ArrowRight' && lastKeys[index] === 'ArrowRight') return true;
        if (key === 'b' && lastKeys[index] === 'b') return true;
        if (key === 'a' && lastKeys[index] === 'a') return true;
        return false;
    });
    
    if (isMatch) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        body.style.filter = 'hue-rotate(0deg)';
    }, 3000);
    
    console.log('🚀 Easter egg activated! ROCKET MODE ENGAGED!');
}

// Console easter egg
console.log('%c🚀 ROCKET MORGAN SYSTEMS ONLINE', 'font-size: 20px; color: #FFD700; text-shadow: 0 0 10px #FF6B35;');
console.log('%cYou are now interacting with the onboard computer system.', 'color: #00d4ff; font-size: 14px;');
console.log('%cTry pressing ↑ ↑ ↓ ↓ ← → ← → B A for a surprise...', 'color: #39ff14; font-size: 12px;');
