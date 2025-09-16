# 
# Variables
# -----------------------------
ENV_FILE = server/.env
EXAMPLE_ENV = server/.env.example
BACKEND_HOST = 127.0.0.1
BACKEND_PORT = 8000


# Phony targets
# -----------------------------
.PHONY: 
	migrate
	env
	clean
	dev
	backend
	frontend


# Default target
# -----------------------------
dev: backend frontend



# Backend scripts
# -----------------------------
env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "$(ENV_FILE) not found. Copying from $(EXAMPLE_ENV)..."; \
		cp $(EXAMPLE_ENV) $(ENV_FILE); \
		echo "Please edit $(ENV_FILE) with your configuration"; \
	else \
		echo "$(ENV_FILE) already exists."; \
	fi



migrate:
	@echo "Running Alembic migrations..."
	# Activate venv and run migrations
	alembic upgrade head


backend:
	@echo "Starting FastAPI server on http://localhost:$(BACKEND_PORT)"
	uvicorn main:app --reload --host $(BACKEND_HOST) --port $(BACKEND_PORT) 


# -----------------------------
# Utility
# -----------------------------
clean:
	@echo "Cleaning cache files..."
	# Python caches
	if exist server\__pycache__ rmdir /s /q server\__pycache__
	if exist server\.pytest_cache rmdir /s /q server\.pytest_cache
	if exist server\.mypy_cache rmdir /s /q server\.mypy_cache
