// Image Placeholder Handler
document.addEventListener('DOMContentLoaded', function() {
    // Fix hero image if needed
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.onerror = function() {
            this.onerror = null;
            this.src = '/static/images/profile-placeholder.svg';
        };
    }
    
    // Fix project images if needed
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.onerror = function() {
            this.onerror = null;
            this.src = '/static/images/project-placeholder.svg';
        };
    });
    
    // Fix blog images if needed
    const blogImages = document.querySelectorAll('.blog-image img');
    blogImages.forEach(img => {
        img.onerror = function() {
            this.onerror = null;
            this.src = '/static/images/blog-placeholder.svg';
        };
    });
    
    // Add data-title attributes if missing
    document.querySelectorAll('.project-image').forEach(container => {
        if (!container.hasAttribute('data-title')) {
            const imgAlt = container.querySelector('img')?.alt || 'Project';
            container.setAttribute('data-title', imgAlt);
        }
    });
    
    document.querySelectorAll('.blog-image').forEach(container => {
        if (!container.hasAttribute('data-title')) {
            const imgAlt = container.querySelector('img')?.alt || 'Blog Post';
            container.setAttribute('data-title', imgAlt);
        }
    });
    
    // Fix particles background if needed
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        // Add a check to see if particles.js is loaded
        setTimeout(() => {
            const particlesCanvas = particlesContainer.querySelector('canvas');
            if (!particlesCanvas) {
                console.log('Particles.js not loaded, applying fallback styling');
                particlesContainer.classList.add('particles-fallback');
            }
        }, 1000);
    }
});
