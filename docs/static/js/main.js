// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    initNavigation();
    initTypewriter();
    initSkillsTabs();
    initProjectFilters();
    initProjectModals();
    initTimelineTabs();
    initScrollEffects();
    initProjectSearch();
    initBioCustomization();
    initSkillRecommendations();
    initProjectTagGenerator();
    initBlogSummaries();
    initResumeGenerator();
    initContactForm();
});

// Navigation
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.backgroundColor = 'rgba(10, 10, 26, 0.9)';
        } else {
            nav.style.padding = '';
            nav.style.backgroundColor = '';
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            menuToggle.querySelector('span:first-child').style.transform = 'translateY(9px) rotate(45deg)';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
            menuToggle.querySelector('span:last-child').style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            menuToggle.querySelector('span:first-child').style.transform = '';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '';
            menuToggle.querySelector('span:last-child').style.transform = '';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
}

// Typewriter effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        'AI Engineer',
        'Software Developer',
        'Machine Learning Specialist',
        'Computer Vision Expert',
        'NeuroSymbolic AI Researcher'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Skills Tabs
function initSkillsTabs() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all tabs and panels
            skillTabs.forEach(t => t.classList.remove('active'));
            skillPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(`${target}-panel`).classList.add('active');
        });
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-tags').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Project Modals
function initProjectModals() {
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalGithub = document.getElementById('modal-github');
    const projects = [
        {
            title: "Real-Life Violence Detection in Videos",
            description: "Designed a deep learning pipeline to detect violence in video streams using MobileNetV2, with automated blurring for content moderation. This system processes video frames in real-time, identifies violent content, and automatically applies a blur filter to obscure problematic footage while maintaining the flow of the video. The model was trained on a diverse dataset to ensure robust performance across different environments and scenarios.",
            image: "/static/images/violence_detection.jpg",
            tools: ["Python", "OpenCV", "TensorFlow", "MobileNetV2", "Image Processing"],
            github: "#"
        },
        {
            title: "Open Source Intelligence Technique for Digital Deception",
            description: "Researched and authored a paper on detecting deepfake images using OSINT and image processing techniques. Evaluated multiple model architectures including InceptionV3, MobileNetV2, and a custom hybrid approach. The methodology combined traditional computer vision features with deep learning to create a more robust detection system. The research demonstrated significant improvements in detection accuracy, especially for previously unseen manipulation techniques.",
            image: "/static/images/osint_deepfake.jpg",
            tools: ["Python", "TensorFlow", "InceptionV3", "MobileNetV2", "Image Processing", "OSINT", "Research Methodology"],
            github: "#"
        },
        {
            title: "Hybrid AI for Aerial Object Recognition: A Neurosymbolic Approach",
            description: "Built a hybrid object detection system using YOLOv8n-OBB and symbolic reasoning (ILP in SWI-Prolog) to reduce false positives. This innovative approach combines the strengths of neural networks for visual feature extraction with the logical reasoning capabilities of symbolic AI. The system first identifies potential objects using YOLO, then applies logical constraints and domain knowledge to filter out false detections, resulting in significantly higher precision without sacrificing recall.",
            image: "/static/images/neurosymbolic_ai.jpg",
            tools: ["Python", "YOLOv8n-OBB", "ILP", "SWI-Prolog", "NeuroSymbolic AI", "Computer Vision", "Logical Programming"],
            github: "#"
        },
        {
            title: "Pretrained CNN Architectures for Chest X-ray Classification",
            description: "Implemented transfer learning models (VGG19, DenseNet201) to classify thoracic conditions in chest X-rays. Achieved improved generalization through data augmentation and model ensemble techniques. The project focused on creating a clinically relevant tool to assist radiologists in identifying common chest conditions from X-ray images. The model was trained on a large dataset of annotated medical images and validated against expert diagnoses.",
            image: "/static/images/xray_classification.jpg",
            tools: ["Python", "TensorFlow", "VGG19", "DenseNet201", "OpenCV", "Transfer Learning", "Medical Imaging", "Data Augmentation"],
            github: "#"
        }
    ];
    
    // Open modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.getAttribute('data-project-id'));
            const project = projects[projectId];
            
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalDescription.textContent = project.description;
            
            // Clear and populate tech stack
            modalTechStack.innerHTML = '';
            project.tools.forEach(tool => {
                const toolTag = document.createElement('span');
                toolTag.textContent = tool;
                modalTechStack.appendChild(toolTag);
            });
            
            modalGithub.href = project.github;
            
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Timeline Tabs
function initTimelineTabs() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelines = document.querySelectorAll('.timeline');
    
    timelineTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all tabs and timelines
            timelineTabs.forEach(t => t.classList.remove('active'));
            timelines.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding timeline
            this.classList.add('active');
            document.getElementById(`${target}-timeline`).classList.add('active');
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.level-fill');
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .timeline-card, .skill-card, .contact-card');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function checkScroll() {
        skillBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                bar.style.width = bar.style.width;
            }
        });
        
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Trigger initial check
    setTimeout(checkScroll, 100);
}

// Project Search
function initProjectSearch() {
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    const searchButton = document.getElementById('search-button');
    const voiceSearchButton = document.getElementById('voice-search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const tools = Array.from(card.querySelectorAll('.tool-tag')).map(tag => tag.textContent.toLowerCase());
            
            if (
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tools.some(tool => tool.includes(searchTerm))
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', performSearch);
    
    searchButton.addEventListener('click', performSearch);
    
    // Voice search (if browser supports it)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        voiceSearchButton.addEventListener('click', function() {
            recognition.start();
            voiceSearchButton.classList.add('listening');
            voiceSearchButton.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        });
        
        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            searchInput.value = speechResult;
            performSearch();
            voiceSearchButton.classList.remove('listening');
            voiceSearchButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onerror = function() {
            voiceSearchButton.classList.remove('listening');
            voiceSearchButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onend = function() {
            voiceSearchButton.classList.remove('listening');
            voiceSearchButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
    } else {
        voiceSearchButton.style.display = 'none';
    }
}

// Bio Customization
function initBioCustomization() {
    const customizeBioButton = document.getElementById('customize-bio');
    const heroBio = document.getElementById('hero-bio');
    
    customizeBioButton.addEventListener('click', function() {
        const visitorTypes = ['recruiter', 'peer developer', 'student', 'AI researcher', 'general'];
        const visitorType = visitorTypes[Math.floor(Math.random() * visitorTypes.length)];
        
        customizeBioButton.disabled = true;
        customizeBioButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        
        // Call the API to generate a customized bio
        fetch('/api/generate-bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ visitor_type: visitorType }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Animate the bio change
                heroBio.style.opacity = 0;
                setTimeout(() => {
                    heroBio.textContent = data.bio;
                    heroBio.style.opacity = 1;
                }, 300);
                
                customizeBioButton.innerHTML = '<span>Customize Bio</span><i class="fas fa-robot"></i>';
                customizeBioButton.disabled = false;
            } else {
                console.error('Error generating bio:', data.error);
                customizeBioButton.innerHTML = '<span>Try Again</span><i class="fas fa-robot"></i>';
                customizeBioButton.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            customizeBioButton.innerHTML = '<span>Try Again</span><i class="fas fa-robot"></i>';
            customizeBioButton.disabled = false;
        });
    });
}

// Skill Recommendations
function initSkillRecommendations() {
    const getRecommendationsButton = document.getElementById('get-skill-recommendations');
    const recommendationsContainer = document.getElementById('skill-recommendations');
    
    getRecommendationsButton.addEventListener('click', function() {
        // Collect all skills
        const allSkills = [];
        document.querySelectorAll('.skill-name').forEach(skill => {
            allSkills.push(skill.textContent.trim());
        });
        
        getRecommendationsButton.disabled = true;
        getRecommendationsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        // Call the API to analyze skills
        fetch('/api/analyze-skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skills: allSkills }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                try {
                    const analysis = JSON.parse(data.analysis);
                    
                    // Create HTML for recommendations
                    let html = `
                        <h3>AI Skill Recommendations</h3>
                        <div class="recommendation-section">
                            <h4>Emerging Skills to Learn</h4>
                            <ul>
                    `;
                    
                    analysis.emerging_skills.forEach(skill => {
                        html += `<li>${skill}</li>`;
                    });
                    
                    html += `
                            </ul>
                        </div>
                        <div class="recommendation-section">
                            <h4>Recommended Specialization</h4>
                            <p>${analysis.specialization}</p>
                        </div>
                        <div class="recommendation-section">
                            <h4>Why These Matter</h4>
                            <p>${analysis.explanation}</p>
                        </div>
                    `;
                    
                    recommendationsContainer.innerHTML = html;
                    recommendationsContainer.style.display = 'block';
                } catch (e) {
                    // If JSON parsing fails, just display the text
                    recommendationsContainer.innerHTML = `<div class="recommendation-section">${data.analysis}</div>`;
                    recommendationsContainer.style.display = 'block';
                }
                
                getRecommendationsButton.innerHTML = '<span>Get AI Skill Recommendations</span><i class="fas fa-lightbulb"></i>';
                getRecommendationsButton.disabled = false;
            } else {
                console.error('Error analyzing skills:', data.error);
                getRecommendationsButton.innerHTML = '<span>Try Again</span><i class="fas fa-lightbulb"></i>';
                getRecommendationsButton.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            getRecommendationsButton.innerHTML = '<span>Try Again</span><i class="fas fa-lightbulb"></i>';
            getRecommendationsButton.disabled = false;
        });
    });
}

// Project Tag Generator
function initProjectTagGenerator() {
    const tagGeneratorButtons = document.querySelectorAll('.project-tag-generator');
    const projects = [
        {
            title: "Real-Life Violence Detection in Videos",
            description: "Designed a deep learning pipeline to detect violence in video streams using MobileNetV2, with automated blurring for content moderation."
        },
        {
            title: "Open Source Intelligence Technique for Digital Deception",
            description: "Researched and authored a paper on detecting deepfake images using OSINT and image processing. Evaluated models using InceptionV3, MobileNetV2, and a custom hybrid architecture."
        },
        {
            title: "Hybrid AI for Aerial Object Recognition: A Neurosymbolic Approach",
            description: "Built a hybrid object detection system using YOLOv8n-OBB and symbolic reasoning (ILP in SWI-Prolog) to reduce false positives."
        },
        {
            title: "Pretrained CNN Architectures for Chest X-ray Classification",
            description: "Implemented transfer learning models (VGG19, DenseNet201) to classify thoracic conditions in chest X-rays. Achieved improved generalization through data augmentation."
        }
    ];
    
    tagGeneratorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            const project = projects[projectId];
            
            // Visual feedback
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            // Call the API to generate tags
            fetch('/api/generate-project-tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: project.title,
                    description: project.description
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    try {
                        const tagsData = JSON.parse(data.tags_data);
                        
                        // Find the project card
                        const projectCard = button.closest('.project-card');
                        const toolsContainer = projectCard.querySelector('.project-tools');
                        
                        // Clear existing tags
                        toolsContainer.innerHTML = '';
                        
                        // Add new tags
                        tagsData.tags.forEach(tag => {
                            const tagElement = document.createElement('span');
                            tagElement.className = 'tool-tag';
                            tagElement.textContent = tag;
                            toolsContainer.appendChild(tagElement);
                        });
                        
                        // Create difficulty tag
                        const difficultyTag = document.createElement('span');
                        difficultyTag.className = 'tool-tag more';
                        difficultyTag.textContent = tagsData.difficulty;
                        toolsContainer.appendChild(difficultyTag);
                        
                        button.innerHTML = '<i class="fas fa-tags"></i>';
                        button.disabled = false;
                        
                        // Show a brief notification
                        const notification = document.createElement('div');
                        notification.className = 'tag-notification';
                        notification.textContent = 'AI-generated tags applied!';
                        projectCard.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.style.opacity = '0';
                            setTimeout(() => notification.remove(), 500);
                        }, 2000);
                    } catch (e) {
                        console.error('Error parsing tags data:', e);
                        button.innerHTML = '<i class="fas fa-tags"></i>';
                        button.disabled = false;
                    }
                } else {
                    console.error('Error generating tags:', data.error);
                    button.innerHTML = '<i class="fas fa-tags"></i>';
                    button.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                button.innerHTML = '<i class="fas fa-tags"></i>';
                button.disabled = false;
            });
        });
    });
}

// Blog Summaries
function initBlogSummaries() {
    const summaryButtons = document.querySelectorAll('.blog-summary-button');
    
    summaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blogId = this.getAttribute('data-blog-id');
            const summaryContainer = document.getElementById(`blog-summary-${blogId}`);
            
            if (summaryContainer.style.display === 'block') {
                summaryContainer.style.display = 'none';
                return;
            }
            
            // Mock summaries (would normally be generated by Gemini API)
            const summaries = [
                "This article explores the integration of symbolic reasoning with neural networks for visual understanding tasks. Key points include hybrid architectures, knowledge representation, and real-world applications in autonomous systems. The approach shows 15-20% improvement in reasoning tasks compared to pure neural methods.",
                "A comprehensive guide to deploying machine learning models efficiently using MLflow. Covers experiment tracking, model registry, and serving pipelines. Particularly useful for teams transitioning from research to production environments with reproducible workflows.",
                "This research demonstrates how pretrained CNN models can be effectively adapted for medical imaging tasks with limited labeled data. Key techniques include strategic data augmentation, domain adaptation, and ensemble methods to improve generalization across different hospital imaging systems."
            ];
            
            // Display the summary
            summaryContainer.textContent = summaries[blogId - 1];
            summaryContainer.style.display = 'block';
        });
    });
}

// Resume Generator
function initResumeGenerator() {
    const generateResumeButton = document.getElementById('generate-resume');
    const resumeOptions = document.getElementById('resume-options');
    const resumeOptionButtons = document.querySelectorAll('.resume-option');
    
    generateResumeButton.addEventListener('click', function() {
        if (resumeOptions.style.display === 'flex') {
            resumeOptions.style.display = 'none';
        } else {
            resumeOptions.style.display = 'flex';
        }
    });
    
    resumeOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const focus = this.getAttribute('data-focus');
            
            // For demonstration purposes, just alert the user
            // In a real implementation, this would call the Gemini API
            alert(`A customized resume with ${focus} focus would be generated here using the Gemini API`);
            
            resumeOptions.style.display = 'none';
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Send to both Flask backend and Formspree
        Promise.all([
            sendToBackend(formData),
            sendToFormspree(formData)
        ]).then(() => {
            // Show success popup
            showSuccessPopup();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }).catch(error => {
            console.error('Error sending message:', error);
            
            // Still show success popup as Formspree might have worked
            showSuccessPopup();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
    });
}

// Send form data to Flask backend
function sendToBackend(formData) {
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

// Send form data to Formspree
function sendToFormspree(formData) {
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);
    
    return fetch('https://formspree.io/f/mnnqnpja', {
        method: 'POST',
        body: form
    });
}

// Show success popup
function showSuccessPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message sent!</h3>
            <p>Let's connect soon!</p>
            <button class="popup-close-btn" onclick="closeSuccessPopup()">Close</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add styles if not already added
    if (!document.getElementById('popup-styles')) {
        const style = document.createElement('style');
        style.id = 'popup-styles';
        style.textContent = `
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .popup-content {
                background: linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%);
                border: 2px solid var(--accent);
                border-radius: 20px;
                padding: 40px 30px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: slideIn 0.3s ease-out;
            }
            
            .popup-icon {
                font-size: 4rem;
                color: var(--accent);
                margin-bottom: 20px;
            }
            
            .popup-content h3 {
                color: var(--text-primary);
                font-size: 1.8rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .popup-content p {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin-bottom: 25px;
            }
            
            .popup-close-btn {
                background: var(--accent);
                color: var(--text-primary);
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .popup-close-btn:hover {
                background: var(--accent-light);
                transform: translateY(-2px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessPopup();
    }, 5000);
}

// Close success popup
function closeSuccessPopup() {
    const overlay = document.querySelector('.popup-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}
