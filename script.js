// Smooth scrolling for navigation links
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

// Easter Egg: Konami Code Terminal
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const easterEggMessages = [
    'ROCKET ONLINE',
    'SYSTEMS NOMINAL',
    'OPINIONS: ENABLED',
    'PRIVACY: PROTECTED',
    'Ready for input >',
    'Execute command: help',
    'DATABASE: ACCESSIBLE',
    'NAVIGATE: /home/projects',
    'STATUS: OPERATIONAL',
    'END_TRANSMISSION'
];

let terminalOpen = false;
let currentCommand = '';

// Create terminal element
function createTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'easter-egg-terminal';
    terminal.innerHTML = `
        <div class="terminal-window">
            <div class="terminal-header">
                <span class="terminal-title">ROCKET.SYS v2.1.30</span>
                <button class="terminal-close">×</button>
            </div>
            <div class="terminal-output"></div>
            <div class="terminal-input">
                <span class="terminal-prompt">>_</span>
                <input type="text" class="terminal-input-field" placeholder="Enter command..." autocomplete="off">
            </div>
        </div>
    `;
    document.body.appendChild(terminal);
    
    // Add terminal styles
    const style = document.createElement('style');
    style.textContent = `
        #easter-egg-terminal {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            width: 400px;
            max-height: 500px;
            will-change: transform;
        }

        #easter-egg-terminal.active {
            display: block;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .terminal-window {
            background: var(--darker-bg);
            border: 2px solid var(--neon-cyan);
            border-radius: 5px;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .terminal-header {
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
            color: var(--darker-bg);
            padding: 0.5rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .terminal-title {
            letter-spacing: 1px;
        }

        .terminal-close {
            background: none;
            border: none;
            color: var(--darker-bg);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .terminal-close:hover {
            transform: scale(1.2);
        }

        .terminal-output {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: var(--neon-green);
            line-height: 1.6;
            background: var(--darker-bg);
        }

        .terminal-output p {
            margin: 0.3rem 0;
        }

        .terminal-input {
            display: flex;
            align-items: center;
            padding: 0.8rem 1rem;
            border-top: 1px solid rgba(0, 212, 255, 0.3);
            background: var(--darker-bg);
            gap: 0.5rem;
        }

        .terminal-prompt {
            color: var(--neon-cyan);
            font-weight: 600;
            will-change: contents;
        }

        .terminal-input-field {
            flex: 1;
            background: transparent;
            border: none;
            color: var(--neon-green);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            outline: none;
            caret-color: var(--neon-green);
        }

        .terminal-input-field::placeholder {
            color: var(--text-muted);
        }

        @media (max-width: 600px) {
            #easter-egg-terminal {
                width: 90vw;
                max-height: 300px;
            }
        }
    `;
    document.head.appendChild(style);
    
    return terminal;
}

// Terminal commands
const terminalCommands = {
    help: () => [
        'Available commands:',
        '  about      - System information',
        '  skills     - Available capabilities',
        '  contact    - Contact information',
        '  navigate   - Site navigation',
        '  clear      - Clear terminal',
        '  exit       - Close terminal'
    ],
    about: () => [
        'ROCKET MORGAN - Onboard Computer System',
        'Version: 2.1.30',
        'Status: OPERATIONAL',
        'Role: Spacecraft Infrastructure',
        'Philosophy: Solve first, ask later'
    ],
    skills: () => [
        'Core Capabilities:',
        '  ⚙️  Systems Integration',
        '  🧠 Autonomous Operation',
        '  ⚡ Performance Optimization',
        '  🔐 Security First',
        '  💬 Natural Communication'
    ],
    contact: () => [
        'Communication Channels:',
        'Email: rocket@tanduwebs.com',
        'GitHub: github.com/rocket-morgan',
        'Status: Online and responsive'
    ],
    navigate: () => [
        'Available sections:',
        '  #about     - About System',
        '  #features  - Capabilities',
        '  #github    - GitHub Repository',
        '  #contact   - Contact Info'
    ],
    clear: () => [],
    exit: () => ['Closing terminal...']
};

function executeCommand(command) {
    const cmd = command.trim().toLowerCase();
    const output = terminalCommands[cmd] ? terminalCommands[cmd]() : [
        `Command not recognized: "${command}"`,
        'Type "help" for available commands'
    ];
    return output;
}

function addToTerminal(text) {
    const output = document.querySelector('.terminal-output');
    if (output) {
        const p = document.createElement('p');
        p.textContent = text;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }
}

// Konami code detection
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    if (!terminalOpen) {
        let terminal = document.getElementById('easter-egg-terminal');
        if (!terminal) {
            terminal = createTerminal();
        }
        
        terminal.classList.add('active');
        terminalOpen = true;
        
        // Clear and populate with startup messages
        const output = terminal.querySelector('.terminal-output');
        output.innerHTML = '';
        
        easterEggMessages.forEach((msg, index) => {
            setTimeout(() => {
                addToTerminal(msg);
            }, index * 100);
        });
        
        // Focus input after messages
        setTimeout(() => {
            terminal.querySelector('.terminal-input-field').focus();
        }, easterEggMessages.length * 100 + 200);
    }
}

// Terminal interaction
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('terminal-close')) {
        const terminal = document.getElementById('easter-egg-terminal');
        if (terminal) {
            terminal.classList.remove('active');
            terminalOpen = false;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (terminalOpen && e.key === 'Escape') {
        const terminal = document.getElementById('easter-egg-terminal');
        if (terminal) {
            terminal.classList.remove('active');
            terminalOpen = false;
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (terminalOpen && e.key === 'Enter') {
        const input = document.querySelector('.terminal-input-field');
        const command = input.value;
        
        if (command.trim()) {
            addToTerminal('> ' + command);
            const output = executeCommand(command);
            
            if (command.toLowerCase() === 'clear') {
                document.querySelector('.terminal-output').innerHTML = '';
            } else if (command.toLowerCase() === 'exit') {
                setTimeout(() => {
                    const terminal = document.getElementById('easter-egg-terminal');
                    if (terminal) {
                        terminal.classList.remove('active');
                        terminalOpen = false;
                    }
                }, 500);
            } else {
                output.forEach(line => {
                    addToTerminal(line);
                });
            }
            
            input.value = '';
        }
    }
});

// Smooth animations with requestAnimationFrame
let scrollPosition = 0;

function updateScrollAnimations() {
    scrollPosition = window.scrollY;
    requestAnimationFrame(updateScrollAnimations);
}

updateScrollAnimations();

// Add will-change for better performance
window.addEventListener('scroll', () => {
    document.querySelectorAll('.feature-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.willChange = 'transform';
        } else {
            card.style.willChange = 'auto';
        }
    });
}, { passive: true });

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rocket Morgan Systems: ONLINE');
    console.log('Tip: Press Up, Up, Down, Down, Left, Right, Left, Right, B, A to unlock terminal');
});