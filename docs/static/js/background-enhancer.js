// Background Enhancement for Profile Image
// This script provides additional background improvement options

document.addEventListener('DOMContentLoaded', function() {
    initBackgroundEnhancement();
});

function initBackgroundEnhancement() {
    const profileImage = document.getElementById('profile-image');
    const imageContainer = document.querySelector('.image-container');
    
    if (!profileImage || !imageContainer) return;
    
    // Apply default professional background only (no controls)
    applyProfessionalBackground();
}

// Background controls function removed - no interactive buttons needed

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