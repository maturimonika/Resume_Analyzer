# 📄 SkillMatch AI – Resume Analyzer

A full-stack AI-powered web app that analyzes how well your resume matches a given job description. Built with **React**, **Node.js**, and **Flask**.

---

## ✨ Features

- 📄 Upload your resume (PDF)
- 📝 Paste any job description
- ✅ Extract skills from resume
- 🎯 Match with job description skills
- 📊 See a skill match score with matched and missing skills

---

## 🧱 Tech Stack

- **Frontend**: React.js, Axios, Custom CSS  
- **Backend**: Node.js, Express, Multer  
- **Microservice**: Python, Flask, PyPDF2  
- **Architecture**: Multi-language full-stack project

---

## 🚀 How to Run Locally

```bash
# 1. Start Python Flask Microservice
cd python-service
python -m venv venv
venv\Scripts\activate  # On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
# Service runs at: http://localhost:5001

# 2. Start Node.js Backend
cd ../server
npm install
node index.js
# Backend runs at: http://localhost:5000

# 3. Start React Frontend
cd ../client
npm install
npm start
# Frontend runs at: http://localhost:3000
