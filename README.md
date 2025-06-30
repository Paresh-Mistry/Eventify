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

![image](https://github.com/user-attachments/assets/60db6816-3a11-4e92-b2db-0983214947cd)

![image](https://github.com/user-attachments/assets/9ee4bcba-15e0-47cd-abe8-207829398af4)

![image](https://github.com/user-attachments/assets/acda2cab-c396-49e3-9b4e-82e7415031e6)

![image](https://github.com/user-attachments/assets/daffdcca-be95-4c55-b410-226148fe881f)

![image](https://github.com/user-attachments/assets/17a82b3a-2e17-4ff8-b822-c0c6e7f970e6)

![image](https://github.com/user-attachments/assets/1823e079-f1dd-44d2-9ee9-500030a4aa67)



## 🧪 Run Locally

### 📦 Backend (FastAPI)

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```

### 📦 Frontend (Next JS)

```bash
cd client
npm run dev
