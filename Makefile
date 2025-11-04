.PHONY: help install run dev clean test lint format setup

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup      - Initial setup (create venv, install dependencies, copy .env)"
	@echo "  make install    - Install dependencies"
	@echo "  make run        - Run the Flask application"
	@echo "  make dev        - Run in development mode with auto-reload"
	@echo "  make clean      - Remove Python cache files and virtual environment"
	@echo "  make lint       - Run code linting (if flake8 is installed)"
	@echo "  make format     - Format code with black (if installed)"
	@echo "  make test       - Run tests (if pytest is installed)"

# Initial setup
setup:
	@echo "Setting up the project..."
	@if [ ! -d "venv" ]; then \
		echo "Creating virtual environment..."; \
		python3 -m venv venv; \
	fi
	@echo "Installing dependencies..."
	@. venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt
	@if [ ! -f ".env" ]; then \
		echo "Copying .env.example to .env..."; \
		cp .env.example .env; \
		echo "Please edit .env with your actual credentials!"; \
	fi
	@echo "Setup complete! Run 'source venv/bin/activate' to activate the virtual environment."

# Install dependencies
install:
	pip install -r requirements.txt

# Run the application
run:
	python app.py

# Run in development mode
dev:
	FLASK_ENV=development FLASK_DEBUG=1 python app.py

# Clean Python cache files and virtual environment
clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	find . -type d -name '*.egg-info' -delete
	rm -rf venv/
	rm -rf .pytest_cache/
	rm -rf .coverage
	rm -rf htmlcov/
	@echo "Cleaned up Python cache files and virtual environment"

# Run linting (requires flake8)
lint:
	@if command -v flake8 >/dev/null 2>&1; then \
		flake8 app.py app_simple.py --max-line-length=120; \
	else \
		echo "flake8 not installed. Install with: pip install flake8"; \
	fi

# Format code (requires black)
format:
	@if command -v black >/dev/null 2>&1; then \
		black app.py app_simple.py --line-length=120; \
	else \
		echo "black not installed. Install with: pip install black"; \
	fi

# Run tests (requires pytest)
test:
	@if command -v pytest >/dev/null 2>&1; then \
		pytest; \
	else \
		echo "pytest not installed. Install with: pip install pytest"; \
	fi

# Generate secret key
secret:
	@python -c "import secrets; print('Generated SECRET_KEY:', secrets.token_hex(32))"
