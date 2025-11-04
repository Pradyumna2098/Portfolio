# 📂 Project Structure

This document provides an overview of the repository structure and explains the purpose of each file and directory.

## 🏗️ Repository Layout

```
Portfolio/
│
├── 📄 Configuration Files
│   ├── .editorconfig              # Editor settings for consistent code style
│   ├── .env.example               # Template for environment variables
│   ├── .gitattributes             # Git attributes for file handling
│   ├── .gitignore                 # Files to ignore in version control
│   ├── .pre-commit-config.yaml    # Pre-commit hooks configuration
│   ├── pyproject.toml             # Python project metadata and tools
│   ├── requirements.txt           # Production Python dependencies
│   ├── requirements-dev.txt       # Development Python dependencies
│   ├── Makefile                   # Command shortcuts for common tasks
│   └── render.yaml                # Render.com deployment configuration
│
├── 📚 Documentation
│   ├── README.md                  # Main project overview and quick start
│   ├── SETUP.md                   # Detailed setup guide for developers
│   ├── CONTRIBUTING.md            # Contribution guidelines
│   ├── DEPLOYMENT_GUIDE.md        # Deployment instructions for Render
│   ├── ADMIN_SETUP.md             # Admin dashboard setup guide
│   ├── BLOG_TUTORIAL.md           # Tutorial for managing blog posts
│   ├── PROJECT_STRUCTURE.md       # This file - project structure overview
│   ├── LICENSE                    # MIT License
│   └── env_template.txt           # Legacy environment template
│
├── 🐍 Python Application
│   ├── app.py                     # Main Flask application (full version)
│   └── app_simple.py              # Simplified Flask app (no auth)
│
├── 🎨 Frontend Assets
│   ├── static/                    # Static files for Flask backend
│   │   ├── css/                   # Stylesheets
│   │   ├── js/                    # JavaScript files
│   │   └── images/                # Image assets
│   │
│   ├── templates/                 # Flask HTML templates
│   │   ├── index.html             # Main portfolio page
│   │   ├── layout.html            # Base template
│   │   ├── admin_login.html       # Admin login page
│   │   └── admin_dashboard.html   # Admin dashboard
│   │
│   └── docs/                      # GitHub Pages deployment
│       ├── index.html             # Static portfolio page
│       ├── static/                # Static assets for GitHub Pages
│       ├── blog/                  # Blog posts directory
│       ├── .nojekyll              # Disable Jekyll processing
│       └── _config.yml            # Jekyll configuration
│
├── 🔧 VS Code Configuration
│   └── .vscode/
│       ├── settings.json          # VS Code workspace settings
│       ├── extensions.json        # Recommended extensions
│       └── launch.json            # Debug configurations
│
└── 🔄 GitHub Configuration
    └── .github/
        ├── workflows/             # GitHub Actions workflows
        │   ├── ci.yml             # Continuous integration
        │   ├── deploy.yml         # Deployment workflow
        │   └── static.yml         # Static site deployment
        │
        ├── ISSUE_TEMPLATE/        # Issue templates
        │   ├── bug_report.md      # Bug report template
        │   ├── feature_request.md # Feature request template
        │   └── question.md        # Question template
        │
        └── pull_request_template.md # PR template
```

## 📋 File Descriptions

### Configuration Files

#### `.editorconfig`
Defines coding styles (indentation, line endings) for consistency across different editors.

#### `.env.example`
Template for environment variables. Copy this to `.env` and fill in your credentials:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `SECRET_KEY`: Flask session secret key
- `ADMIN_USERNAME`: Admin dashboard username
- `ADMIN_PASSWORD`: Admin dashboard password

#### `.gitattributes`
Configures how Git handles different file types (line endings, binary files, etc.).

#### `.gitignore`
Specifies files that Git should ignore (virtual environments, cache files, secrets).

#### `.pre-commit-config.yaml`
Configuration for pre-commit hooks that run before each commit to ensure code quality.

#### `pyproject.toml`
Modern Python project configuration file containing:
- Project metadata
- Dependencies
- Tool configurations (Black, Flake8, pytest)

#### `requirements.txt`
Production Python dependencies. Install with: `pip install -r requirements.txt`

#### `requirements-dev.txt`
Development dependencies (linters, formatters, testing tools).

#### `Makefile`
Provides convenient commands:
- `make setup`: Initial project setup
- `make run`: Run the Flask application
- `make dev`: Run in development mode
- `make clean`: Clean cache files
- `make lint`: Run code linting
- `make format`: Format code with Black

### Documentation Files

#### `README.md`
Main entry point with project overview, features, and quick start guide.

#### `SETUP.md`
Comprehensive setup guide with step-by-step instructions for:
- First-time installation
- Environment configuration
- Git workflow
- Troubleshooting

#### `CONTRIBUTING.md`
Guidelines for contributing to the project:
- Development workflow
- Code style guidelines
- Pull request process

#### `DEPLOYMENT_GUIDE.md`
Instructions for deploying to:
- Render.com (backend)
- GitHub Pages (frontend)

### Python Application

#### `app.py`
Main Flask application with:
- Admin authentication
- Blog management
- AI-powered features (Gemini API integration)
- File upload handling
- RESTful API endpoints

#### `app_simple.py`
Simplified version without authentication, useful for development and testing.

### Frontend Structure

#### `static/` and `templates/`
Flask backend assets and templates.

#### `docs/`
Static site for GitHub Pages deployment. Contains the compiled portfolio website.

### VS Code Configuration

#### `.vscode/settings.json`
Workspace-specific settings:
- Python interpreter configuration
- Formatting settings (Black)
- Linting settings (Flake8)
- File associations

#### `.vscode/extensions.json`
Recommended VS Code extensions for the project.

#### `.vscode/launch.json`
Debug configurations for running Flask app in VS Code debugger.

### GitHub Configuration

#### `.github/workflows/`
GitHub Actions CI/CD pipelines:
- **ci.yml**: Runs linting and tests on PRs
- **deploy.yml**: Deploys to GitHub Pages
- **static.yml**: Static site deployment

#### `.github/ISSUE_TEMPLATE/`
Templates for creating structured issues (bugs, features, questions).

#### `.github/pull_request_template.md`
Template for pull requests to ensure all necessary information is provided.

## 🚀 Getting Started

1. **First time setup**: Follow [SETUP.md](SETUP.md)
2. **Make changes**: See [CONTRIBUTING.md](CONTRIBUTING.md)
3. **Deploy**: Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📝 Key Points

- **Never commit `.env` file** - It contains secrets
- **Use virtual environment** - Keeps dependencies isolated
- **Follow code style** - Pre-commit hooks enforce standards
- **Write tests** - If you add new features
- **Update docs** - When you change functionality

## 🔗 Quick Links

- [Setup Guide](SETUP.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Main README](README.md)

---

For questions or issues, check the documentation or create an issue on GitHub!
