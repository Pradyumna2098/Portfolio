from flask import Flask, render_template, request, jsonify
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Flask app
app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
