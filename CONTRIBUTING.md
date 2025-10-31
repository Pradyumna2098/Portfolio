# Contributing to Pradyumna's Portfolio

Thank you for your interest in contributing to this project! This guide will help you get started with local development.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8 or higher**
- **Git**
- **pip** (Python package installer)
- A **Gemini API key** (for AI features) - Get one at [Google AI Studio](https://ai.google.dev/)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pradyumna2098/Portfolio.git
   cd Portfolio
   ```

2. **Create a virtual environment**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your credentials
   # - Generate a SECRET_KEY: python -c "import secrets; print(secrets.token_hex(32))"
   # - Add your GEMINI_API_KEY from https://ai.google.dev/
   # - Set ADMIN_USERNAME and ADMIN_PASSWORD
   ```

5. **Run the application**
   ```bash
   python app.py
   ```
   
   The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
Portfolio/
├── app.py                 # Main Flask application
├── app_simple.py          # Simplified version (no auth)
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .env                  # Your local environment variables (not in git)
├── static/               # Static assets (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/            # Flask HTML templates
│   ├── index.html
│   ├── admin_login.html
│   └── admin_dashboard.html
├── docs/                 # GitHub Pages deployment
│   ├── index.html
│   └── static/
└── .github/
    └── workflows/        # GitHub Actions workflows
```

## 🔧 Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Test your changes locally
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Run the app
   python app.py
   
   # Test in your browser
   # - Navigate to http://localhost:5000
   # - Test all modified features
   # - Check the admin dashboard at http://localhost:5000/admin/login
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the repository on GitHub
   - Click "Pull Requests" > "New Pull Request"
   - Select your branch and describe your changes

### Common Tasks

#### Running in Development Mode
```bash
# Set Flask to development mode for auto-reload
export FLASK_ENV=development  # Linux/Mac
set FLASK_ENV=development     # Windows

python app.py
```

#### Updating Dependencies
```bash
pip install package-name
pip freeze > requirements.txt
```

#### Testing AI Features
Ensure your `.env` file has a valid `GEMINI_API_KEY` to test:
- Bio generation
- Skill analysis
- Project tag generation
- Chatbot functionality

## 🎨 Code Style Guidelines

- **Python**: Follow PEP 8 style guide
- **JavaScript**: Use ES6+ features, consistent indentation (2 spaces)
- **CSS**: Use consistent naming conventions
- **Comments**: Add comments for complex logic

## 🐛 Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Python version, browser)

## 🔒 Security

- Never commit `.env` files or secrets
- Use environment variables for sensitive data
- Report security vulnerabilities privately

## 📝 Documentation

When adding new features:
- Update the README.md if needed
- Add inline code comments for complex logic
- Update DEPLOYMENT_GUIDE.md for deployment changes

## 🤝 Pull Request Guidelines

Good pull requests:
- Focus on a single feature or fix
- Include clear descriptions
- Reference related issues
- Pass all existing tests (if any)
- Don't break existing functionality

## ❓ Getting Help

- Check the README.md for general information
- Review DEPLOYMENT_GUIDE.md for deployment help
- Create an issue for questions or problems

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
