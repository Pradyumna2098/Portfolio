// Background Enhancement for Profile Image
// This script provides additional background improvement options

document.addEventListener('DOMContentLoaded', function() {
    initBackgroundEnhancement();
});

function initBackgroundEnhancement() {
    const profileImage = document.getElementById('profile-image');
    const imageContainer = document.querySelector('.image-container');
    
    if (!profileImage || !imageContainer) return;
    
    // Add background enhancement options
    addBackgroundControls();
    
    // Apply default professional background
    applyProfessionalBackground();
}

function addBackgroundControls() {
    const imageContainer = document.querySelector('.image-container');
    
    // Create a control panel for background options
    const controlPanel = document.createElement('div');
    controlPanel.className = 'bg-control-panel';
    controlPanel.innerHTML = `
        <div class="bg-controls">
            <button onclick="applyProfessionalBackground()" class="bg-btn active" data-bg="professional">
                <i class="fas fa-user-tie"></i> Professional
            </button>
            <button onclick="applyGradientBackground()" class="bg-btn" data-bg="gradient">
                <i class="fas fa-palette"></i> Gradient
            </button>
            <button onclick="applyMinimalBackground()" class="bg-btn" data-bg="minimal">
                <i class="fas fa-circle"></i> Minimal
            </button>
            <button onclick="resetOriginal()" class="bg-btn" data-bg="original">
                <i class="fas fa-undo"></i> Original
            </button>
        </div>
    `;
    
    // Add styles for the control panel
    const style = document.createElement('style');
    style.textContent = `
        .bg-control-panel {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .image-container:hover .bg-control-panel {
            opacity: 1;
        }
        
        .bg-controls {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .bg-btn {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .bg-btn:hover,
        .bg-btn.active {
            background: var(--accent-primary);
            border-color: var(--accent-primary);
            transform: scale(1.1);
        }
        
        .bg-btn i {
            font-size: 14px;
        }
    `;
    
    document.head.appendChild(style);
    imageContainer.appendChild(controlPanel);
}

function applyProfessionalBackground() {
    const imageContainer = document.querySelector('.image-container');
    const profileImage = document.getElementById('profile-image');
    
    // Reset any previous styles
    resetImageStyles();
    
    // Apply professional business background
    imageContainer.style.background = `
        linear-gradient(135deg, #1a1a3a 0%, #2d1b69 50%, #1a1a3a 100%),
        radial-gradient(circle at 70% 30%, rgba(123, 92, 255, 0.1) 0%, transparent 50%)
    `;
    
    profileImage.style.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
    profileImage.style.mixBlendMode = 'normal';
    
    setActiveButton('professional');
}

function applyGradientBackground() {
    const imageContainer = document.querySelector('.image-container');
    const profileImage = document.getElementById('profile-image');
    
    resetImageStyles();
    
    // Apply dynamic gradient background
    imageContainer.style.background = `
        linear-gradient(45deg, #667eea 0%, #764ba2 100%),
        radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)
    `;
    
    profileImage.style.filter = 'contrast(1.05) brightness(1.02) saturate(1.05)';
    profileImage.style.mixBlendMode = 'multiply';
    
    setActiveButton('gradient');
}

function applyMinimalBackground() {
    const imageContainer = document.querySelector('.image-container');
    const profileImage = document.getElementById('profile-image');
    
    resetImageStyles();
    
    // Apply clean, minimal background
    imageContainer.style.background = `
        linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)
    `;
    
    profileImage.style.filter = 'contrast(1.15) brightness(1.1) saturate(0.9)';
    profileImage.style.mixBlendMode = 'multiply';
    
    setActiveButton('minimal');
}

function resetOriginal() {
    resetImageStyles();
    setActiveButton('original');
}

function resetImageStyles() {
    const imageContainer = document.querySelector('.image-container');
    const profileImage = document.getElementById('profile-image');
    
    // Reset to original styles
    imageContainer.style.background = '';
    profileImage.style.filter = '';
    profileImage.style.mixBlendMode = '';
    profileImage.style.mask = '';
    profileImage.style.webkitMask = '';
}

function setActiveButton(activeType) {
    const buttons = document.querySelectorAll('.bg-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-bg') === activeType) {
            btn.classList.add('active');
        }
    });
}

// Export functions for global access
window.applyProfessionalBackground = applyProfessionalBackground;
window.applyGradientBackground = applyGradientBackground;
window.applyMinimalBackground = applyMinimalBackground;
window.resetOriginal = resetOriginal;