// Admin Dashboard JavaScript

class AdminDashboard {
    constructor() {
        this.baseURL = window.location.origin;
        this.initTabs();
        this.initForms();
        this.loadContent();
        this.initImagePreviews();
    }

    // Tab Management
    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update button states
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content states
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Form Handlers
    initForms() {
        // Paper Upload Form
        const paperForm = document.getElementById('paperForm');
        if (paperForm) {
            paperForm.addEventListener('submit', (e) => this.handlePaperUpload(e));
        }

        // Blog Post Form
        const blogForm = document.getElementById('blogForm');
        if (blogForm) {
            blogForm.addEventListener('submit', (e) => this.handleBlogPost(e));
        }

        // Image Upload Form
        const imageForm = document.getElementById('imageForm');
        if (imageForm) {
            imageForm.addEventListener('submit', (e) => this.handleImageUpload(e));
        }
    }

    // Paper Upload Handler
    async handlePaperUpload(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const button = e.target.querySelector('.upload-btn');
        
        try {
            this.setButtonLoading(button, true);
            
            const response = await fetch('/admin/upload_paper', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                this.showSuccess('Technical paper uploaded successfully!');
                e.target.reset();
                this.loadContent(); // Refresh content list
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    // Blog Post Handler
    async handleBlogPost(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const button = e.target.querySelector('.upload-btn');
        
        try {
            this.setButtonLoading(button, true);
            
            const response = await fetch('/admin/create_blog', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                this.showSuccess('Blog post created successfully!');
                e.target.reset();
                this.loadContent(); // Refresh content list
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Creation failed');
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    // Image Upload Handler
    async handleImageUpload(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const button = e.target.querySelector('.upload-btn');
        
        try {
            this.setButtonLoading(button, true);
            this.showProgressModal('Uploading Images...', 0);
            
            const response = await fetch('/admin/upload_image', {
                method: 'POST',
                body: formData
            });

            this.updateProgress(100);

            if (response.ok) {
                const result = await response.json();
                setTimeout(() => {
                    this.hideProgressModal();
                    this.showSuccess(`${result.uploaded_count} image(s) uploaded successfully!`);
                    e.target.reset();
                    this.clearImagePreviews();
                }, 500);
            } else {
                const error = await response.json();
                this.hideProgressModal();
                throw new Error(error.message || 'Upload failed');
            }
            
        } catch (error) {
            this.hideProgressModal();
            this.showError(error.message);
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    // Image Preview Functionality
    initImagePreviews() {
        const imageInput = document.getElementById('imageFiles');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                this.displayImagePreviews(e.target.files);
            });
        }
    }

    displayImagePreviews(files) {
        const container = document.getElementById('imagePreviews');
        if (!container) return;
        
        container.innerHTML = '';
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview';
                
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);
                
                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                
                previewDiv.appendChild(img);
                previewDiv.appendChild(fileName);
                container.appendChild(previewDiv);
            }
        });
    }

    clearImagePreviews() {
        const container = document.getElementById('imagePreviews');
        if (container) {
            container.innerHTML = '';
        }
    }

    // Content Management
    async loadContent() {
        try {
            const [blogsResponse, papersResponse] = await Promise.all([
                fetch('/admin/api/blogs'),
                fetch('/admin/api/papers')
            ]);

            if (blogsResponse.ok && papersResponse.ok) {
                const blogs = await blogsResponse.json();
                const papers = await papersResponse.json();
                
                this.displayBlogs(blogs);
                this.displayPapers(papers);
                this.updateStats(blogs.length, papers.length);
            }
        } catch (error) {
            console.error('Failed to load content:', error);
        }
    }

    displayBlogs(blogs) {
        const container = document.getElementById('blogsList');
        if (!container) return;

        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-blog"></i>
                    <p>No blog posts yet. Create your first blog post above!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = blogs.map(blog => `
            <div class="content-item" data-id="${blog.id}">
                <div class="content-info">
                    <h4>${blog.title}</h4>
                    <p>${blog.excerpt}</p>
                    <small>Created: ${new Date(blog.date).toLocaleDateString()}</small>
                </div>
                <div class="content-actions">
                    <button class="action-btn" onclick="adminDashboard.editBlog('${blog.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteBlog('${blog.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    displayPapers(papers) {
        const container = document.getElementById('papersList');
        if (!container) return;

        if (papers.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-file-alt"></i>
                    <p>No technical papers yet. Upload your first paper above!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = papers.map(paper => `
            <div class="content-item" data-id="${paper.id}">
                <div class="content-info">
                    <h4>${paper.title}</h4>
                    <p>${paper.description}</p>
                    <small>Uploaded: ${new Date(paper.upload_date).toLocaleDateString()}</small>
                </div>
                <div class="content-actions">
                    <button class="action-btn" onclick="window.open('${paper.file_url}', '_blank')" title="View">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="action-btn delete" onclick="adminDashboard.deletePaper('${paper.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats(blogCount, paperCount) {
        const blogStat = document.querySelector('[data-stat="blogs"] .stat-number');
        const paperStat = document.querySelector('[data-stat="papers"] .stat-number');
        
        if (blogStat) blogStat.textContent = blogCount;
        if (paperStat) paperStat.textContent = paperCount;
    }

    // Content Actions
    async deleteBlog(blogId) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        
        try {
            const response = await fetch(`/admin/api/blogs/${blogId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showSuccess('Blog post deleted successfully!');
                this.loadContent();
            } else {
                throw new Error('Failed to delete blog post');
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    async deletePaper(paperId) {
        if (!confirm('Are you sure you want to delete this technical paper?')) return;
        
        try {
            const response = await fetch(`/admin/api/papers/${paperId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showSuccess('Technical paper deleted successfully!');
                this.loadContent();
            } else {
                throw new Error('Failed to delete paper');
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    editBlog(blogId) {
        // For now, just show info - could expand to inline editing
        this.showInfo('Edit functionality will be available in a future update.');
    }

    // UI Helper Functions
    setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Uploading...
            `;
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || 'Upload';
        }
    }

    // Progress Modal
    showProgressModal(title, progress) {
        const modal = document.getElementById('progressModal');
        const titleEl = modal.querySelector('.progress-info h3');
        const progressBar = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');
        
        titleEl.textContent = title;
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
        modal.style.display = 'flex';
    }

    updateProgress(progress) {
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressText) progressText.textContent = progress + '%';
    }

    hideProgressModal() {
        const modal = document.getElementById('progressModal');
        modal.style.display = 'none';
    }

    // Notification System
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    background: linear-gradient(135deg, #10b981, #059669);
                }
                .notification-error {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                }
                .notification-info {
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to page and animate
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Logout Handler
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/admin/logout';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// Handle file input change for better UX
document.addEventListener('change', (e) => {
    if (e.target.type === 'file') {
        const label = document.querySelector(`label[for="${e.target.id}"]`);
        if (label && e.target.files.length > 0) {
            const fileCount = e.target.files.length;
            const fileName = fileCount === 1 ? e.target.files[0].name : `${fileCount} files selected`;
            
            // Update label text if it contains placeholder text
            const originalText = label.textContent;
            if (originalText.includes('Choose') || originalText.includes('Select')) {
                label.textContent = fileName;
                label.style.color = 'var(--accent-primary)';
            }
        }
    }
});