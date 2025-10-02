// Blog Management System
document.addEventListener('DOMContentLoaded', function() {
    initBlogManagement();
});

function initBlogManagement() {
    setupFileUploads();
    loadExistingContent();
}

function setupFileUploads() {
    // Paper upload handler
    document.getElementById('paper-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            handlePaperUpload(file);
        } else {
            alert('Please select a valid PDF file.');
        }
    });
    
    // Image upload handler
    document.getElementById('image-upload').addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleImageUpload(files);
        }
    });
}

function handlePaperUpload(file) {
    const formData = new FormData();
    formData.append('paper', file);
    
    // Show upload progress
    showUploadProgress('Uploading paper...', 0);
    
    // Simulate upload progress (replace with actual upload to your server)
    simulateUpload(() => {
        const fileName = file.name;
        const paperInfo = {
            title: fileName.replace('.pdf', ''),
            file: fileName,
            uploadDate: new Date().toISOString(),
            status: 'uploaded'
        };
        
        addPaperToList(paperInfo);
        showUploadProgress('Paper uploaded successfully!', 100);
        
        // Generate embedding code
        generatePaperEmbedCode(paperInfo);
    });
}

function handleImageUpload(files) {
    showUploadProgress('Uploading images...', 0);
    
    files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                createImagePreview(e.target.result, file.name);
            };
            reader.readAsDataURL(file);
        }
    });
    
    simulateUpload(() => {
        showUploadProgress('Images uploaded successfully!', 100);
    });
}

function createImagePreview(src, name) {
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.innerHTML = `
        <img src="${src}" alt="${name}" style="max-width: 150px; max-height: 150px; border-radius: 8px;">
        <p>${name}</p>
        <button onclick="copyImagePath('${name}')" class="upload-btn" style="font-size: 0.8rem; padding: 5px 10px;">
            <i class="fas fa-copy"></i> Copy Path
        </button>
    `;
    
    // Add to a preview container (create if it doesn't exist)
    let previewContainer = document.getElementById('image-previews');
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.id = 'image-previews';
        previewContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; margin-top: 20px; padding: 20px; background: var(--card-bg); border-radius: var(--radius-lg);';
        document.querySelector('.blog-upload-section').appendChild(previewContainer);
    }
    
    previewContainer.appendChild(preview);
}

function copyImagePath(imageName) {
    const path = `static/images/${imageName}`;
    navigator.clipboard.writeText(path).then(() => {
        showNotification('Image path copied to clipboard!', 'success');
    });
}

function simulateUpload(callback) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(callback, 500);
        }
        showUploadProgress(null, progress);
    }, 200);
}

function showUploadProgress(message, progress) {
    let progressBar = document.getElementById('upload-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'upload-progress';
        progressBar.innerHTML = `
            <div class="progress-container">
                <div class="progress-message">Uploading...</div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
        `;
        document.querySelector('.upload-area').appendChild(progressBar);
        
        // Add progress bar styles
        const style = document.createElement('style');
        style.textContent = `
            #upload-progress {
                margin-top: 20px;
                padding: 15px;
                background: rgba(123, 92, 255, 0.1);
                border-radius: var(--radius-md);
                border: 1px solid var(--accent-primary);
            }
            
            .progress-container {
                text-align: center;
            }
            
            .progress-message {
                color: var(--text-primary);
                margin-bottom: 10px;
                font-weight: 500;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--accent-primary);
                transition: width 0.3s ease;
                width: 0%;
            }
            
            .progress-text {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    if (message) {
        progressBar.querySelector('.progress-message').textContent = message;
    }
    
    progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
    progressBar.querySelector('.progress-text').textContent = `${Math.round(progress)}%`;
    
    if (progress >= 100) {
        setTimeout(() => {
            progressBar.remove();
        }, 2000);
    }
}

function addPaperToList(paperInfo) {
    const papersList = document.getElementById('papers-list');
    const paperItem = document.createElement('div');
    paperItem.className = 'content-item';
    paperItem.innerHTML = `
        <div class="content-info">
            <h4>${paperInfo.title}</h4>
            <p>Uploaded: ${new Date(paperInfo.uploadDate).toLocaleDateString()}</p>
            <span class="content-status published">Uploaded</span>
        </div>
        <div class="content-actions">
            <button class="action-btn edit" onclick="editPaper('${paperInfo.file}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn" onclick="downloadPaper('${paperInfo.file}')">
                <i class="fas fa-download"></i>
            </button>
            <button class="action-btn delete" onclick="deletePaper('${paperInfo.file}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Replace the pending item or add new one
    const pendingItem = papersList.querySelector('.content-status.pending');
    if (pendingItem) {
        pendingItem.closest('.content-item').replaceWith(paperItem);
    } else {
        papersList.appendChild(paperItem);
    }
    
    // Update stats
    updateStats();
}

function generatePaperEmbedCode(paperInfo) {
    const embedCode = `
<!-- Add this to your blog section in index.html -->
<div class="blog-card featured-paper">
    <div class="paper-badge">
        <i class="fas fa-file-alt"></i>
        <span>Research Paper</span>
    </div>
    <img src="static/images/paper-thumbnail.jpg" 
         alt="${paperInfo.title} thumbnail" 
         loading="lazy" 
         width="300" 
         height="200">
    <div class="blog-content">
        <h3>${paperInfo.title}</h3>
        <p>Brief description of your technical paper and its key contributions...</p>
        <div class="paper-meta">
            <span class="paper-type">Research Paper</span>
            <span class="paper-date">${new Date().getFullYear()}</span>
        </div>
        <div class="paper-actions">
            <a href="papers/${paperInfo.file}" class="read-more paper-link" target="_blank">
                <i class="fas fa-file-pdf"></i> Read Paper
            </a>
            <a href="blog/${paperInfo.title.toLowerCase().replace(/\\s+/g, '-')}.html" class="read-more blog-link">
                <i class="fas fa-book-open"></i> Blog Post
            </a>
        </div>
    </div>
</div>
    `;
    
    showEmbedCodeModal(embedCode);
}

function showEmbedCodeModal(code) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: var(--radius-lg);
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="color: var(--text-primary); margin-bottom: 20px;">
                <i class="fas fa-code"></i> Embed Code Generated
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 15px;">
                Copy this code and paste it into your index.html file to add your paper:
            </p>
            <textarea style="
                width: 100%;
                height: 200px;
                background: var(--bg-secondary);
                border: 1px solid var(--card-border);
                border-radius: var(--radius-md);
                color: var(--text-primary);
                padding: 15px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                resize: vertical;
            " readonly>${code}</textarea>
            <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
                <button onclick="copyEmbedCode(this)" class="upload-btn">
                    <i class="fas fa-copy"></i> Copy Code
                </button>
                <button onclick="this.closest('div[style*=fixed]').remove()" class="upload-btn" style="background: var(--text-secondary);">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function copyEmbedCode(button) {
    const textarea = button.closest('div').querySelector('textarea');
    textarea.select();
    document.execCommand('copy');
    
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = 'var(--success)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'var(--accent-primary)';
    }, 2000);
}

function openBlogEditor() {
    // This would open a blog post editor
    // For now, show a simple form
    showBlogEditorModal();
}

function showBlogEditorModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: var(--radius-lg);
            padding: 30px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="color: var(--text-primary); margin-bottom: 20px;">
                <i class="fas fa-edit"></i> Quick Blog Post
            </h3>
            <form id="blog-form">
                <div style="margin-bottom: 15px;">
                    <label style="color: var(--text-primary); display: block; margin-bottom: 5px;">Title:</label>
                    <input type="text" id="blog-title" style="
                        width: 100%;
                        background: var(--bg-secondary);
                        border: 1px solid var(--card-border);
                        border-radius: var(--radius-md);
                        color: var(--text-primary);
                        padding: 10px;
                    " placeholder="Enter blog post title">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="color: var(--text-primary); display: block; margin-bottom: 5px;">Description:</label>
                    <textarea id="blog-description" style="
                        width: 100%;
                        height: 80px;
                        background: var(--bg-secondary);
                        border: 1px solid var(--card-border);
                        border-radius: var(--radius-md);
                        color: var(--text-primary);
                        padding: 10px;
                        resize: vertical;
                    " placeholder="Brief description for the blog card"></textarea>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="color: var(--text-primary); display: block; margin-bottom: 5px;">Content:</label>
                    <textarea id="blog-content" style="
                        width: 100%;
                        height: 200px;
                        background: var(--bg-secondary);
                        border: 1px solid var(--card-border);
                        border-radius: var(--radius-md);
                        color: var(--text-primary);
                        padding: 10px;
                        resize: vertical;
                    " placeholder="Write your blog post content here..."></textarea>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="submit" class="upload-btn">
                        <i class="fas fa-save"></i> Generate Blog
                    </button>
                    <button type="button" onclick="this.closest('div[style*=fixed]').remove()" class="upload-btn" style="background: var(--text-secondary);">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    modal.querySelector('#blog-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('blog-title').value;
        const description = document.getElementById('blog-description').value;
        const content = document.getElementById('blog-content').value;
        
        if (title && description && content) {
            generateBlogPost(title, description, content);
            modal.remove();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

function generateBlogPost(title, description, content) {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const blogHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Pradyumna S R</title>
    <link rel="stylesheet" href="../static/css/style.css">
    <link rel="stylesheet" href="../static/css/blog-enhanced.css">
</head>
<body class="theme-dark">
    <article style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
        <header style="margin-bottom: 40px; text-align: center;">
            <h1 style="color: var(--text-primary); margin-bottom: 15px;">${title}</h1>
            <div style="color: var(--text-secondary); margin-bottom: 20px;">
                Published on ${new Date().toLocaleDateString()}
            </div>
            <a href="../index.html" style="color: var(--accent-primary); text-decoration: none;">
                ← Back to Portfolio
            </a>
        </header>
        
        <div style="color: var(--text-primary); line-height: 1.8; font-size: 1.1rem;">
            ${content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        </div>
        
        <footer style="margin-top: 60px; text-align: center; padding-top: 30px; border-top: 1px solid var(--card-border);">
            <p style="color: var(--text-secondary);">
                Thanks for reading! Connect with me on 
                <a href="https://linkedin.com/in/pradyumnasr" style="color: var(--accent-primary);">LinkedIn</a>
            </p>
        </footer>
    </article>
</body>
</html>
    `;
    
    // Generate the blog card code for index.html
    const blogCardCode = `
<div class="blog-card">
    <img src="static/images/blog-${slug}.jpg" 
         alt="Blog post thumbnail - ${title}" 
         loading="lazy" 
         width="300" 
         height="200">
    <div class="blog-content">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="blog/${slug}.html" class="read-more">Read More</a>
    </div>
</div>
    `;
    
    // Show both generated files
    showGeneratedBlogModal(slug, blogHTML, blogCardCode);
}

function showGeneratedBlogModal(slug, blogHTML, blogCardCode) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: var(--radius-lg);
            padding: 30px;
            max-width: 900px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="color: var(--text-primary); margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i> Blog Post Generated!
            </h3>
            
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--text-primary); margin-bottom: 10px;">Instructions:</h4>
                <ol style="color: var(--text-secondary); padding-left: 20px;">
                    <li>Create a file named <code>${slug}.html</code> in the <code>/blog/</code> folder</li>
                    <li>Copy the HTML content below into that file</li>
                    <li>Add the blog card code to your <code>index.html</code> file</li>
                    <li>Add a thumbnail image named <code>blog-${slug}.jpg</code> to your images folder</li>
                </ol>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--text-primary); margin-bottom: 10px;">Blog HTML File:</h4>
                <textarea readonly style="
                    width: 100%;
                    height: 150px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--card-border);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    padding: 15px;
                    font-family: 'Courier New', monospace;
                    font-size: 0.8rem;
                ">${blogHTML}</textarea>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--text-primary); margin-bottom: 10px;">Blog Card for index.html:</h4>
                <textarea readonly style="
                    width: 100%;
                    height: 100px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--card-border);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    padding: 15px;
                    font-family: 'Courier New', monospace;
                    font-size: 0.8rem;
                ">${blogCardCode}</textarea>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="copyAllBlogCode()" class="upload-btn">
                    <i class="fas fa-copy"></i> Copy All
                </button>
                <button onclick="this.closest('div[style*=fixed]').remove()" class="upload-btn" style="background: var(--text-secondary);">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function updateStats() {
    // Update paper count
    const paperCount = document.querySelectorAll('#papers-list .content-item').length;
    document.getElementById('paper-count').textContent = paperCount;
}

function loadExistingContent() {
    // This would load existing content from your server
    // For now, just update the display
    updateStats();
}

function editPaper(filename) {
    showNotification('Paper editing feature coming soon!', 'info');
}

function deletePaper(filename) {
    if (confirm('Are you sure you want to delete this paper?')) {
        showNotification('Paper deletion feature coming soon!', 'info');
    }
}

function downloadPaper(filename) {
    // This would download the paper
    window.open(`../papers/${filename}`, '_blank');
}

function previewChanges() {
    window.open('../index.html', '_blank');
}

function publishChanges() {
    showNotification('Publishing feature coming soon! For now, commit your changes to git.', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--info)'};
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: var(--radius-md);
        z-index: 1001;
        box-shadow: var(--shadow-large);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}