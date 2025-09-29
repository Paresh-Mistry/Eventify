# 🎉 Eventify — Event Management System

Eventify is a full-stack event booking and management system designed for organizers and attendees. It allows event creation, user registrations, secure payments, FAQs handling, and more — all in a clean and intuitive interface.

---

## 🚀 Features

- 🎫 Event Creation with step-by-step form
- 🧾 Real-time FAQs per event
- 📷 Banner/image upload
- 📅 Date & Time scheduling
- 🏷️ Online/Offline event support
- 👥 Organizer-user mapping
- 💳 Payment integration via Razorpay
- 📡 API-first architecture with FastAPI + GraphQL
- 🔐 Secure & RESTful endpoints

---

## 🛠️ Tech Stack

| Layer         | Tech                          |
|---------------|-------------------------------|
| **Frontend**  | Next.js, Tailwind CSS, React Hooks |
| **Backend**   | FastAPI, Pydantic, GraphQL (optional) |
| **Database**  | PostgreSQL (SQLAlchemy ORM)   |
| **Payments**  | Razorpay                      |
| **Image Uploads** | FormData + FastAPI UploadFile |
| **Version Control** | Git + GitHub              |

---

## 📷 Screenshots
<img width="1891" height="902" alt="image" src="https://github.com/user-attachments/assets/f70b06dc-f59d-4a34-b3a8-3bbfe6638351" />

<img width="1901" height="908" alt="image" src="https://github.com/user-attachments/assets/be75cfbc-f8b6-45a7-a34a-4d6df52df731" />
<img width="1917" height="913" alt="image" src="https://github.com/user-attachments/assets/f588707c-5473-4feb-bad0-8c1e5f4d0305" />

<img width="1897" height="907" alt="image" src="https://github.com/user-attachments/assets/07c963d0-e8b2-44e4-8d13-25c6092691d6" />

<img width="1901" height="910" alt="image" src="https://github.com/user-attachments/assets/d3a409f6-90ad-442f-a5eb-7e4712b8ee9d" />

<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/132f5077-c5a2-4fab-b1be-6a76b6adfb94" />

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/beee3ee7-9ce0-447a-99ee-9a1c2bc1b6b8" />

<img width="447" height="797" alt="image" src="https://github.com/user-attachments/assets/2070c18b-5a04-4a40-8769-2e28248944ce" />
<img width="452" height="800" alt="image" src="https://github.com/user-attachments/assets/3b9c49dc-f6ac-43c8-9a76-73806b339932" />


--- 

## 🧪 Run Locally

### 📦 Backend (FastAPI)

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate environment
# On macOS/Linux
source venv/bin/activate
# On Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server with hot reload
uvicorn main:app --reload

```


### 📦 Frontend (Next JS)

```bash
cd client
npm run dev
```

### 🛠 Developer Setup: Pre-commit Hooks

To ensure code quality and consistency, we use **pre-commit** hooks for formatting and linting.

```bash
# Install pre-commit globally (if not already)
pip install pre-commit

# Install hooks defined in .pre-commit-config.yaml
pre-commit install

# Run pre-commit manually on all files
pre-commit run --all-files

# To upgrade pre-commit hooks in future
pre-commit autoupdate
```

# 📜 License

> Copyright (c) 2025 Eventify
