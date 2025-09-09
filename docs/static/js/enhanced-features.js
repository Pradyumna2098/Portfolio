// Enhanced functionality for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    initScrollSpy();
    initBackToTop();
    initSkillsTabs();
    initSmoothScroll();
    initProjectMetrics();
    initA11yEnhancements();
});

// Scrollspy functionality
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call on load
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
}

// Enhanced skills tabs with keyboard navigation
function initSkillsTabs() {
    const skillsData = {
        programming: [
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'R', icon: 'fab fa-r-project' },
            { name: 'JavaScript', icon: 'fab fa-js-square' },
            { name: 'SWI-Prolog', icon: 'fas fa-code' },
            { name: 'SQL', icon: 'fas fa-database' }
        ],
        tools: [
            { name: 'TensorFlow', icon: 'fas fa-brain' },
            { name: 'PyTorch', icon: 'fas fa-fire' },
            { name: 'OpenCV', icon: 'fas fa-eye' },
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'Git', icon: 'fab fa-git-alt' },
            { name: 'AWS', icon: 'fab fa-aws' },
            { name: 'Camunda', icon: 'fas fa-cogs' }
        ],
        'ai-ml': [
            { name: 'Machine Learning', icon: 'fas fa-robot' },
            { name: 'Deep Learning', icon: 'fas fa-brain' },
            { name: 'Computer Vision', icon: 'fas fa-eye' },
            { name: 'NLP', icon: 'fas fa-language' },
            { name: 'Neural Networks', icon: 'fas fa-project-diagram' },
            { name: 'Data Science', icon: 'fas fa-chart-line' }
        ],
        soft: [
            { name: 'Problem Solving', icon: 'fas fa-lightbulb' },
            { name: 'Team Collaboration', icon: 'fas fa-users' },
            { name: 'Communication', icon: 'fas fa-comments' },
            { name: 'Research', icon: 'fas fa-search' },
            { name: 'Project Management', icon: 'fas fa-tasks' },
            { name: 'Critical Thinking', icon: 'fas fa-brain' }
        ]
    };
    
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');
    let currentTabIndex = 0;
    
    function switchTab(targetId) {
        // Remove active class from all tabs and panels
        skillTabs.forEach(tab => tab.classList.remove('active'));
        skillPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to target tab and panel
        const targetTab = document.querySelector(`[data-target="${targetId}"]`);
        const targetPanel = document.getElementById(`${targetId}-panel`);
        
        if (targetTab && targetPanel) {
            targetTab.classList.add('active');
            targetPanel.classList.add('active');
            
            // Update skills content
            updateSkillsContent(targetId, targetPanel);
        }
    }
    
    function updateSkillsContent(category, panel) {
        const skillsGrid = panel.querySelector('.skills-grid');
        if (!skillsGrid || !skillsData[category]) return;
        
        skillsGrid.innerHTML = '';
        
        skillsData[category].forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-info">
                    <h3 class="skill-name">${skill.name}</h3>
                </div>
            `;
            skillsGrid.appendChild(skillCard);
        });
    }
    
    // Click handlers
    skillTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentTabIndex = index;
            const target = tab.getAttribute('data-target');
            switchTab(target);
        });
    });
    
    // Keyboard navigation
    skillTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    currentTabIndex = (currentTabIndex - 1 + skillTabs.length) % skillTabs.length;
                    skillTabs[currentTabIndex].focus();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    currentTabIndex = (currentTabIndex + 1) % skillTabs.length;
                    skillTabs[currentTabIndex].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    tab.click();
                    break;
            }
        });
    });
    
    // Initialize first tab
    if (skillTabs.length > 0) {
        const firstTab = skillTabs[0];
        const target = firstTab.getAttribute('data-target');
        switchTab(target);
    }
}

// Smooth scroll for internal anchors
function initSmoothScroll() {
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
}

// Project metrics (placeholder for future implementation)
function initProjectMetrics() {
    // This function can be expanded when real metrics are available
    const metricElements = document.querySelectorAll('.project-metric');
    metricElements.forEach(element => {
        // Add animation or real-time updates here
        element.style.opacity = '0.8';
    });
}

// Enhanced accessibility
function initA11yEnhancements() {
    // Add focus visible styles
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Enhance project cards for keyboard navigation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Blog posts availability check (runs after DOM is loaded)
document.addEventListener('DOMContentLoaded', function() {
    const blogLinks = document.querySelectorAll('.read-more');
    
    blogLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if blog post exists
        fetch(href, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    // Hide the read more button if post doesn't exist
                    link.style.display = 'none';
                }
            })
            .catch(() => {
                // Keep the links as they are placeholder URLs
                // They can be updated when real blog posts are created
            });
    });
});
