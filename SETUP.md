# 🚀 Quick Setup Guide

This guide will help you set up the portfolio project on your local machine and push changes to GitHub.

## 📋 Prerequisites

Before you start, make sure you have:

1. **Python 3.8+** installed
   - Check: `python --version` or `python3 --version`
   - Download from: https://www.python.org/downloads/

2. **Git** installed
   - Check: `git --version`
   - Download from: https://git-scm.com/downloads

3. **A text editor or IDE**
   - VS Code (recommended): https://code.visualstudio.com/
   - PyCharm, Sublime Text, or any other editor

4. **GitHub account** 
   - Sign up at: https://github.com/

## 🎯 Quick Start (First Time Setup)

### Option A: Using Make (Recommended for Linux/Mac)

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/Pradyumna2098/Portfolio.git
cd Portfolio

# 2. Run the setup command
make setup

# 3. Activate the virtual environment
source venv/bin/activate  # On Linux/Mac
# OR
venv\Scripts\activate     # On Windows

# 4. Edit .env file with your credentials
# Open .env in your editor and add:
# - SECRET_KEY (generate with: make secret)
# - GEMINI_API_KEY (get from https://ai.google.dev/)
# - ADMIN_USERNAME and ADMIN_PASSWORD

# 5. Run the application
make run
```

### Option B: Manual Setup (Works on all platforms)

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/Pradyumna2098/Portfolio.git
cd Portfolio

# 2. Create a virtual environment
python -m venv venv
# OR
python3 -m venv venv

# 3. Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file from template
cp .env.example .env
# OR on Windows:
copy .env.example .env

# 6. Edit .env file
# Open .env in your text editor and fill in:
# - SECRET_KEY: Generate with: python -c "import secrets; print(secrets.token_hex(32))"
# - GEMINI_API_KEY: Get from https://ai.google.dev/
# - ADMIN_USERNAME: Your admin username
# - ADMIN_PASSWORD: Your admin password

# 7. Run the application
python app.py
```

## 🌐 Access the Application

Once running, open your browser and go to:
- **Main site**: http://localhost:5000
- **Admin login**: http://localhost:5000/admin/login

## 🔑 Getting Your Gemini API Key

1. Go to https://ai.google.dev/
2. Click "Get API Key" or "Get Started"
3. Sign in with your Google account
4. Create a new API key
5. Copy the key and paste it in your `.env` file

## 📝 Making Changes and Pushing to GitHub

### First Time GitHub Setup

If you're working with your own fork or haven't connected to GitHub:

```bash
# Configure Git with your details
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# If you forked the repo, set the remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/Portfolio.git
```

### Daily Workflow

```bash
# 1. Make sure you're on the main branch
git checkout main

# 2. Pull the latest changes
git pull origin main

# 3. Create a new branch for your changes
git checkout -b feature/my-new-feature

# 4. Make your changes in VS Code or your editor
# Edit files, add features, fix bugs, etc.

# 5. Check what files you changed
git status

# 6. Add your changes
git add .
# OR add specific files:
git add app.py templates/index.html

# 7. Commit your changes
git commit -m "Brief description of what you changed"

# 8. Push to GitHub
git push origin feature/my-new-feature

# 9. Create a Pull Request on GitHub
# - Go to your repository on GitHub
# - Click "Compare & pull request"
# - Add a description and create the PR
```

### Quick Updates to Main Branch

If you're working directly on main (not recommended for collaboration):

```bash
# 1. Check status
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Your commit message"

# 4. Push to GitHub
git push origin main
```

## 🐛 Troubleshooting Common Issues

### "Python not found"
- Install Python from https://www.python.org/downloads/
- Make sure Python is added to your PATH during installation
- Try `python3` instead of `python`

### "pip not found"
```bash
# Install pip
python -m ensurepip --upgrade
# OR
python3 -m ensurepip --upgrade
```

### "Permission denied" when activating venv on Windows
```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Git push rejected" or "Permission denied"
```bash
# Set up Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# If using HTTPS, you may need a personal access token
# Go to GitHub Settings > Developer settings > Personal access tokens
# Generate a token and use it as your password when pushing
```

### "Port 5000 already in use"
```bash
# Change the port in app.py:
# At the bottom of app.py, change:
# app.run(debug=True, port=5000)
# to:
# app.run(debug=True, port=5001)
```

### "ModuleNotFoundError"
```bash
# Make sure virtual environment is activated
# You should see (venv) in your terminal
# Then reinstall dependencies:
pip install -r requirements.txt
```

### Can't push to GitHub
```bash
# Check your remote URL
git remote -v

# If it's not correct, update it:
git remote set-url origin https://github.com/YOUR_USERNAME/Portfolio.git

# Make sure you have the right permissions
# You may need to use a Personal Access Token instead of password
```

## 📚 Additional Resources

- **Full contribution guide**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Deployment guide**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Admin setup**: See [ADMIN_SETUP.md](ADMIN_SETUP.md)
- **Blog tutorial**: See [BLOG_TUTORIAL.md](BLOG_TUTORIAL.md)

## 💡 Tips for VS Code Users

### Recommended Extensions
- Python (Microsoft)
- Pylance
- GitLens
- Prettier
- HTML CSS Support

### Open the project in VS Code
```bash
cd Portfolio
code .
```

### Using the integrated terminal
- Press `Ctrl + `` (backtick) to open terminal
- Run all commands directly from VS Code

## 🎉 You're All Set!

You should now be able to:
- ✅ Run the portfolio locally
- ✅ Make changes to the code
- ✅ Commit your changes
- ✅ Push to GitHub
- ✅ Deploy to Render or GitHub Pages

If you encounter any issues, check the troubleshooting section above or create an issue on GitHub.

Happy coding! 🚀
