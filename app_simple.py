from flask import Flask, render_template, request, jsonify
import os

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
    return jsonify({
        "success": True,
        "bio": "This is a simplified bio for testing purposes."
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
