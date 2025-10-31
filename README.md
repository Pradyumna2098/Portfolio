# Pradyumna's Futuristic Portfolio

[![Deploy to GitHub Pages](https://github.com/Pradyumna2098/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pradyumna2098/Portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A dynamic, AI-driven portfolio that showcases Pradyumna's skills, projects, and achievements using the Gemini Free Tier API. The portfolio is modular, easily editable, and visually futuristic, with seamless integration of AI features for interactivity and personalization.

🌐 **[View Live Portfolio](https://pradyumna2098.github.io/Portfolio)**

## 📚 Documentation

- **[Quick Setup Guide](SETUP.md)** - Get started in minutes!
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to this project
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deploy to Render or GitHub Pages
- **[Admin Setup](ADMIN_SETUP.md)** - Configure the admin dashboard
- **[Blog Tutorial](BLOG_TUTORIAL.md)** - Add and manage blog posts

## Features

- **AI-Powered Introduction Section**: Dynamic bio generation based on visitor type using the Gemini API.
- **Interactive Skills Showcase**: Visual skill displays with AI-powered skill recommendations.
- **Immersive Project Gallery**: 3D hover effects, AI-generated tags, and filtering options.
- **Experience & Education Timeline**: Interactive 3D timeline with animations.
- **AI-Curated Blog/Articles**: AI-generated summaries of blog posts.
- **Smart Contact Hub**: AI-powered resume generation options.
- **Futuristic Interactive Elements**: Gemini-powered chatbot for answering visitor questions.
- **Theme Options**: Multiple futuristic themes (Dark, Light, Cyberpunk, Midnight).

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Integration**: Google Gemini API
- **Animation**: GSAP, Three.js
- **Visual Effects**: Particles.js

## Getting Started

### Prerequisites

- Python 3.8+
- Gemini API Key

### Quick Installation

```bash
# Clone the repository
git clone https://github.com/Pradyumna2098/Portfolio.git
cd Portfolio

# Run the setup (Linux/Mac)
make setup
source venv/bin/activate

# OR Manual setup (all platforms)
python -m venv venv
# Activate: venv\Scripts\activate (Windows) or source venv/bin/activate (Linux/Mac)
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run the application
python app.py
```

Open your browser and navigate to `http://localhost:5000`

📖 **For detailed setup instructions, see [SETUP.md](SETUP.md)**

## Customization

### Adding New Projects

To add a new project:

1. Update the `projects` list in `app.py`
2. Add project images to `static/images/`
3. Update the `projects` array in `main.js` for modal functionality

### Changing Themes

The portfolio includes four themes:
- Dark (default)
- Light
- Cyberpunk
- Midnight

To customize themes, edit the theme CSS files in `static/css/`.

### Modifying AI Features

The portfolio integrates with the Gemini API in several ways:
- Bio generation (`/api/generate-bio`)
- Skill analysis (`/api/analyze-skills`)
- Project tag generation (`/api/generate-project-tags`)
- Chatbot functionality (`/api/chatbot`)
- Search functionality (`/api/search`)

Each API endpoint can be customized in `app.py` to adjust the prompts or response handling.

## Folder Structure

```
portfolio-website/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (create this file)
├── static/
│   ├── css/               # CSS files
│   ├── js/                # JavaScript files
│   └── images/            # Image assets
└── templates/             # HTML templates
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Google Gemini API](https://ai.google.dev/gemini-api)
- [Flask](https://flask.palletsprojects.com/)
- [Particles.js](https://vincentgarreau.com/particles.js/)
- [Three.js](https://threejs.org/)
- [GSAP](https://greensock.com/gsap/)
- [Font Awesome](https://fontawesome.com/)
