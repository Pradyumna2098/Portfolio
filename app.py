from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash, send_from_directory
import os
import google.generativeai as genai
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
import json
from datetime import datetime
import uuid

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-change-this-in-production')

# Upload configuration
UPLOAD_FOLDER = 'docs/static/uploads'
PAPERS_FOLDER = 'docs/papers'
IMAGES_FOLDER = 'docs/static/images'
BLOGS_FOLDER = 'docs/blog'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create upload directories if they don't exist
for folder in [UPLOAD_FOLDER, PAPERS_FOLDER, IMAGES_FOLDER, BLOGS_FOLDER]:
    os.makedirs(folder, exist_ok=True)

# Define personal information for easier access
personal_info = {
    "name": "Pradyumna S R",
    "location": "Berlin, Germany",
    "email": "pradyumnaswara@gmail.com",
    "phone": "017632445799",
    "linkedin": "linkedin.com/in/pradyumnasr",
    "github": "github.com/Pradyumna2098",
    "profile_summary": "An engineer passionate about intelligent systems and AI solutions, with a focus on bridging research and real-world applications. Strong background in machine learning, data processing, and AI theory. Values interdisciplinary collaboration, continuous learning, and human-centric technology."
}

# Define skills for the skills section
skills = {
    "programming_languages": ["Python", "R", "SWI-Prolog"],
    "tools_frameworks": ["TensorFlow", "PyTorch", "OpenCV", "Docker", "Camunda", "YOLO", "MLflow"],
    "ai_ml_specializations": ["Computer Vision", "NLP", "NeuroSymbolic AI", "Transfer Learning"],
    "soft_skills": ["Collaboration", "Problem-Solving", "Continuous Learning"]
}

# Define projects for the project gallery
projects = [
    {
        "title": "Real-Life Violence Detection in Videos",
        "description": "Designed a deep learning pipeline to detect violence in video streams using MobileNetV2, with automated blurring for content moderation.",
        "tools": ["Python", "OpenCV", "TensorFlow", "MobileNetV2", "Image Processing"],
        "image": "Voilence detection in videos.png",
        "github_link": "#"
    },
    {
        "title": "Open Source Intelligence Technique for Digital Deception",
        "description": "Researched and authored a paper on detecting deepfake images using OSINT and image processing. Evaluated models using InceptionV3, MobileNetV2, and a custom hybrid architecture.",
        "tools": ["Python", "TensorFlow", "InceptionV3", "MobileNetV2", "Image Processing"],
        "image": "OSINT.png",
        "github_link": "#"
    },
    {
        "title": "Hybrid AI for Aerial Object Recognition: A Neurosymbolic Approach",
        "description": "Built a hybrid object detection system using YOLOv8n-OBB and symbolic reasoning (ILP in SWI-Prolog) to reduce false positives.",
        "tools": ["Python", "YOLOv8n-OBB", "ILP", "SWI-Prolog", "NeuroSymbolic AI"],
        "image": "NSAI.png",
        "github_link": "#"
    },
    {
        "title": "Pretrained CNN Architectures for Chest X-ray Classification",
        "description": "Implemented transfer learning models (VGG19, DenseNet201) to classify thoracic conditions in chest X-rays. Achieved improved generalization through data augmentation.",
        "tools": ["Python", "TensorFlow", "VGG19", "DenseNet201", "OpenCV", "Transfer Learning"],
        "image": "Chest Xray.png",
        "github_link": "#"
    }
]

# Define experience for the timeline
experiences = [
    {
        "title": "Software Engineer",
        "company": "Profinch Solutions Pvt Ltd",
        "location": "Bengaluru, Karnataka",
        "duration": "Sept 2020 – Dec 2022",
        "responsibilities": [
            "Collaborated with 25+ team members to design scalable software solutions.",
            "Maintained microservices using Docker, improving system reliability.",
            "Implemented a workflow model using Camunda, achieving 30% faster BPMN process development."
        ]
    },
    {
        "title": "Software Engineer Intern",
        "company": "Profinch Solutions Pvt Ltd",
        "location": "Bengaluru, Karnataka",
        "duration": "July 2020 – Sept 2020",
        "responsibilities": [
            "Analyzed data to optimize system installations and integration with microservices.",
            "Enhanced application functionality by integrating REST APIs and third-party tools.",
            "Created an interactive learning platform for team skill development."
        ]
    }
]

# Define education for the timeline
education = [
    {
        "institution": "SRH University of Applied Sciences",
        "degree": "Master's in Computer Science",
        "duration": "2023 – 2025",
        "focus": "Big Data and AI",
        "coursework": ["Machine Learning", "Big Data", "Cloud", "AI"]
    },
    {
        "institution": "Maharaja Institute of Technology",
        "degree": "Bachelor's in Electronics and Communication",
        "duration": "2016 – 2020",
        "focus": "",
        "coursework": ["Analog Electronics", "Digital Electronics", "Communication Systems"]
    }
]

# Routes
@app.route('/')
def index():
    # Ensure project images exist or use placeholders
    for project in projects:
        project['image'] = project.get('image', 'placeholder.jpg')
    
    return render_template('index.html', 
                           personal_info=personal_info,
                           skills=skills,
                           projects=projects,
                           experiences=experiences,
                           education=education)

@app.route('/api/generate-bio', methods=['POST'])
def generate_bio():
    try:
        data = request.get_json()
        visitor_type = data.get('visitor_type', 'general')
        
        # Use Gemini API to generate a tailored bio
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""
        Generate a professional, engaging bio for Pradyumna S R, tailored for a {visitor_type} visitor.
        Include these details:
        - Software Engineer with focus on AI and ML
        - Experience in machine learning, data processing, and AI theory
        - Values interdisciplinary collaboration and human-centric technology
        - Keep it concise (150 words max) and professional with a futuristic tone
        """
        
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "bio": response.text
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/analyze-skills', methods=['POST'])
def analyze_skills():
    try:
        data = request.get_json()
        skills_list = data.get('skills', [])
        
        # Use Gemini API to suggest skill improvements
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""
        Based on these skills: {', '.join(skills_list)}
        
        Suggest:
        1. Three emerging technologies or skills that would complement this skill set
        2. One specific area where deeper specialization would be valuable
        3. A brief explanation of why these suggestions are relevant in today's tech landscape
        
        Format as JSON with keys: "emerging_skills", "specialization", "explanation"
        """
        
        response = model.generate_content(prompt)
        
        # Parse the response text as JSON and return
        return jsonify({
            "success": True,
            "analysis": response.text
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/generate-project-tags', methods=['POST'])
def generate_project_tags():
    try:
        data = request.get_json()
        project_title = data.get('title', '')
        project_description = data.get('description', '')
        
        # Use Gemini API to generate relevant tags
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""
        Based on this project:
        Title: {project_title}
        Description: {project_description}
        
        Generate:
        1. A list of 5-7 relevant technology tags
        2. 2-3 industry application areas
        3. A difficulty level (Beginner, Intermediate, Advanced)
        
        Format response as JSON with keys: "tags", "applications", "difficulty"
        """
        
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "tags_data": response.text
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # Use Gemini API for the chatbot responses
        model = genai.GenerativeModel('gemini-pro')
        
        # Context about Pradyumna for the chatbot
        context = """
        You are an AI assistant for Pradyumna S R's portfolio website. 
        About Pradyumna:
        - Software Engineer specialized in AI, ML, and intelligent systems
        - Experience with Python, TensorFlow, PyTorch, Computer Vision, NLP, and NeuroSymbolic AI
        - Projects include violence detection in videos, deepfake detection, aerial object recognition, and medical image classification
        - Values collaboration, continuous learning, and human-centric technology
        - Located in Berlin, Germany
        
        Answer questions about Pradyumna's skills, projects, experience, or offer to connect visitors with him.
        Keep responses concise, informative, and professional.
        """
        
        prompt = f"{context}\n\nUser: {user_message}\nResponse:"
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "response": response.text
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get('query', '')
        
        # Use Gemini API to search content
        model = genai.GenerativeModel('gemini-pro')
        
        # Context about the portfolio content
        context = """
        Portfolio content includes:
        - Projects: Real-Life Violence Detection, OSINT for Digital Deception, Hybrid AI for Aerial Object Recognition, Pretrained CNN for X-ray Classification
        - Skills: Python, R, SWI-Prolog, TensorFlow, PyTorch, OpenCV, Docker, Camunda, YOLO, MLflow, Computer Vision, NLP, NeuroSymbolic AI, Transfer Learning
        - Experience: Software Engineer at Profinch Solutions (2020-2022)
        - Education: Master's in Computer Science (Big Data and AI), Bachelor's in Electronics and Communication
        """
        
        prompt = f"""
        {context}
        
        Based on the search query: "{query}"
        
        Return the most relevant content from the portfolio.
        Format as JSON with keys: "section" (project/skill/experience/education), "items" (array of matching items), "relevance_score" (1-10)
        """
        
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "results": response.text
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json()
        
        if not data or not all(key in data for key in ['name', 'email', 'message']):
            return jsonify({
                "success": False,
                "error": "Missing required fields"
            }), 400
        
        name = data['name']
        email = data['email']
        message = data['message']
        
        # Send email notification to your personal email
        send_contact_email(name, email, message)
        
        return jsonify({
            "success": True,
            "message": "Contact form submitted successfully"
        })
        
    except Exception as e:
        print(f"Error in contact form: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to process contact form"
        }), 500

def send_contact_email(name, email, message):
    """Send email notification when someone submits the contact form"""
    try:
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        # Get email credentials from environment variables
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        sender_email = os.getenv("SENDER_EMAIL")  # Your email for sending
        sender_password = os.getenv("SENDER_PASSWORD")  # App password
        recipient_email = personal_info["email"]  # Your personal email to receive messages
        
        if not sender_email or not sender_password:
            print("Email credentials not configured")
            return False
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"New Contact Form Submission from {name}"
        
        # Email body
        body = f"""
        You have received a new message from your portfolio website!
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        
        ---
        This message was sent from your portfolio contact form.
        Reply directly to {email} to respond to the sender.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        print(f"Contact email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

# Authentication system
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

def load_blog_data():
    """Load blog posts from JSON file"""
    blog_file = os.path.join(BLOGS_FOLDER, 'blog_data.json')
    if os.path.exists(blog_file):
        with open(blog_file, 'r') as f:
            return json.load(f)
    return {'posts': [], 'papers': []}

def save_blog_data(data):
    """Save blog posts to JSON file"""
    blog_file = os.path.join(BLOGS_FOLDER, 'blog_data.json')
    with open(blog_file, 'w') as f:
        json.dump(data, f, indent=2)

# Admin login route
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        # Check credentials (stored in environment variables)
        admin_username = os.getenv('ADMIN_USERNAME', 'admin')
        admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')  # Change this!
        
        if username == admin_username and password == admin_password:
            session['logged_in'] = True
            session['username'] = username
            return jsonify({'success': True, 'redirect': '/admin/dashboard'})
        else:
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    
    # Return login page HTML
    return render_template('admin_login.html')

# Admin logout
@app.route('/admin/logout')
def admin_logout():
    session.clear()
    return redirect(url_for('index'))

# Admin dashboard
@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    blog_data = load_blog_data()
    return render_template('admin_dashboard.html', 
                          posts=blog_data.get('posts', []),
                          papers=blog_data.get('papers', []))

# Upload paper route
@app.route('/api/upload_paper', methods=['POST'])
@login_required
def upload_paper():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        file = request.files['file']
        title = request.form.get('title', '')
        description = request.form.get('description', '')
        
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        if file and file.filename.lower().endswith('.pdf'):
            filename = secure_filename(file.filename)
            # Add timestamp to avoid conflicts
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{filename}"
            
            file_path = os.path.join(PAPERS_FOLDER, filename)
            file.save(file_path)
            
            # Save paper info to blog data
            blog_data = load_blog_data()
            paper_info = {
                'id': str(uuid.uuid4()),
                'title': title or filename.replace('.pdf', ''),
                'description': description,
                'filename': filename,
                'upload_date': datetime.now().isoformat(),
                'type': 'paper'
            }
            
            blog_data.setdefault('papers', []).append(paper_info)
            save_blog_data(blog_data)
            
            return jsonify({
                'success': True, 
                'message': 'Paper uploaded successfully',
                'paper': paper_info
            })
        else:
            return jsonify({'success': False, 'error': 'Only PDF files are allowed'}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Upload image route
@app.route('/api/upload_image', methods=['POST'])
@login_required
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Add timestamp to avoid conflicts
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            name, ext = os.path.splitext(filename)
            filename = f"{timestamp}_{name}{ext}"
            
            file_path = os.path.join(IMAGES_FOLDER, filename)
            file.save(file_path)
            
            return jsonify({
                'success': True, 
                'message': 'Image uploaded successfully',
                'filename': filename,
                'path': f'static/images/{filename}'
            })
        else:
            return jsonify({'success': False, 'error': 'File type not allowed'}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Create blog post route
@app.route('/api/create_blog', methods=['POST'])
@login_required
def create_blog():
    try:
        data = request.get_json()
        title = data.get('title', '')
        description = data.get('description', '')
        content = data.get('content', '')
        image = data.get('image', '')
        
        if not all([title, description, content]):
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        # Generate blog post
        import re
        slug = re.sub(r'[^a-z0-9-]', '', title.lower().replace(' ', '-'))
        post_id = str(uuid.uuid4())
        
        # Create HTML file
        blog_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Pradyumna S R</title>
    <link rel="stylesheet" href="../static/css/style.css">
    <link rel="stylesheet" href="../static/css/blog-enhanced.css">
</head>
<body class="theme-dark">
    <article style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
        <header style="margin-bottom: 40px; text-align: center;">
            <h1 style="color: var(--text-primary); margin-bottom: 15px;">{title}</h1>
            <div style="color: var(--text-secondary); margin-bottom: 20px;">
                Published on {datetime.now().strftime('%B %d, %Y')}
            </div>
            <a href="../index.html" style="color: var(--accent-primary); text-decoration: none;">
                ← Back to Portfolio
            </a>
        </header>
        
        <div style="color: var(--text-primary); line-height: 1.8; font-size: 1.1rem;">
            {''.join(f'<p>{p.strip()}</p>' for p in content.split('\n') if p.strip())}
        </div>
        
        <footer style="margin-top: 60px; text-align: center; padding-top: 30px; border-top: 1px solid var(--card-border);">
            <p style="color: var(--text-secondary);">
                Thanks for reading! Connect with me on 
                <a href="https://linkedin.com/in/pradyumnasr" style="color: var(--accent-primary);">LinkedIn</a>
            </p>
        </footer>
    </article>
</body>
</html>"""
        
        # Save HTML file
        blog_file_path = os.path.join(BLOGS_FOLDER, f'{slug}.html')
        with open(blog_file_path, 'w', encoding='utf-8') as f:
            f.write(blog_html)
        
        # Save blog info
        blog_data = load_blog_data()
        post_info = {
            'id': post_id,
            'title': title,
            'description': description,
            'slug': slug,
            'image': image,
            'created_date': datetime.now().isoformat(),
            'type': 'blog'
        }
        
        blog_data.setdefault('posts', []).append(post_info)
        save_blog_data(blog_data)
        
        return jsonify({
            'success': True, 
            'message': 'Blog post created successfully',
            'post': post_info
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Get blog posts for frontend
@app.route('/api/get_posts')
def get_posts():
    blog_data = load_blog_data()
    return jsonify(blog_data)

# Delete post/paper
@app.route('/api/delete_content/<content_id>', methods=['DELETE'])
@login_required
def delete_content(content_id):
    try:
        blog_data = load_blog_data()
        
        # Find and remove from posts
        blog_data['posts'] = [p for p in blog_data.get('posts', []) if p['id'] != content_id]
        
        # Find and remove from papers
        for paper in blog_data.get('papers', []):
            if paper['id'] == content_id:
                # Delete PDF file
                pdf_path = os.path.join(PAPERS_FOLDER, paper['filename'])
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                break
        
        blog_data['papers'] = [p for p in blog_data.get('papers', []) if p['id'] != content_id]
        
        save_blog_data(blog_data)
        
        return jsonify({'success': True, 'message': 'Content deleted successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# API Routes for Content Management
@app.route('/admin/api/blogs')
@login_required
def api_get_blogs():
    """Get all blog posts for admin dashboard"""
    try:
        blog_data = load_blog_data()
        blogs = blog_data.get('blogs', [])
        
        # Format blogs for display
        formatted_blogs = []
        for blog in blogs:
            formatted_blogs.append({
                'id': blog['id'],
                'title': blog['title'],
                'excerpt': blog['content'][:150] + '...' if len(blog['content']) > 150 else blog['content'],
                'date': blog['date'],
                'tags': blog.get('tags', [])
            })
        
        return jsonify(formatted_blogs)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/api/papers')
@login_required
def api_get_papers():
    """Get all technical papers for admin dashboard"""
    try:
        blog_data = load_blog_data()
        papers = blog_data.get('papers', [])
        
        # Format papers for display
        formatted_papers = []
        for paper in papers:
            formatted_papers.append({
                'id': paper['id'],
                'title': paper['title'],
                'description': paper['description'],
                'upload_date': paper['upload_date'],
                'file_url': f'/static/papers/{paper["filename"]}',
                'filename': paper['filename']
            })
        
        return jsonify(formatted_papers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/api/blogs/<blog_id>', methods=['DELETE'])
@login_required
def api_delete_blog(blog_id):
    """Delete a specific blog post"""
    try:
        blog_data = load_blog_data()
        
        # Find and remove the blog post
        blog_data['blogs'] = [blog for blog in blog_data.get('blogs', []) if blog['id'] != blog_id]
        
        save_blog_data(blog_data)
        
        return jsonify({'success': True, 'message': 'Blog post deleted successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/admin/api/papers/<paper_id>', methods=['DELETE'])
@login_required
def api_delete_paper(paper_id):
    """Delete a specific technical paper"""
    try:
        blog_data = load_blog_data()
        
        # Find the paper to delete its file
        paper_to_delete = None
        for paper in blog_data.get('papers', []):
            if paper['id'] == paper_id:
                paper_to_delete = paper
                break
        
        if paper_to_delete:
            # Delete the PDF file
            pdf_path = os.path.join(PAPERS_FOLDER, paper_to_delete['filename'])
            if os.path.exists(pdf_path):
                os.remove(pdf_path)
        
        # Remove from data
        blog_data['papers'] = [paper for paper in blog_data.get('papers', []) if paper['id'] != paper_id]
        
        save_blog_data(blog_data)
        
        return jsonify({'success': True, 'message': 'Technical paper deleted successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
