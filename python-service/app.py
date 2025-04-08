from flask import Flask, request, jsonify
import PyPDF2
import io

app = Flask(__name__)

# Predefined skills list
KNOWN_SKILLS = {
    # Programming Languages
    "Java", "Python", "C", "C++", "C#", "Go", "Ruby", "Swift", "Kotlin", "TypeScript", "JavaScript",

    # Frontend
    "HTML", "CSS", "SASS", "Bootstrap", "Tailwind", "React", "Angular", "Vue", "Next.js",

    # Backend
    "Node.js", "Express", "Django", "Flask", "Spring Boot",

    # Databases
    "MySQL", "PostgreSQL", "MongoDB", "Oracle", "SQL Server", "Redis",

    # DevOps & Cloud
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Jenkins", "CI/CD", "GitHub Actions",

    # APIs & Protocols
    "REST", "SOAP", "GraphQL", "gRPC",

    # Tools & IDEs
    "Git", "JIRA", "Postman", "VS Code", "Figma", "Eclipse", "IntelliJ", "Jupyter",

    # AI/ML
    "TensorFlow", "PyTorch", "scikit-learn", "LangChain", "HuggingFace", "Pinecone",

    # Testing
    "Jest", "Mocha", "Cypress", "Selenium", "JUnit",

    # Platforms / Services
    "SAP", "SAP HANA", "Salesforce", "WordPress", "Shopify"
}


def extract_skills_from_text(text):
    lower_text = text.lower()
    detected = [skill for skill in KNOWN_SKILLS if skill.lower() in lower_text]
    return detected

@app.route('/')
def home():
    return '✅ Python microservice is running!'

@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['resume']
    job_description = request.form.get("jobDescription", "")

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Extract resume text
        reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        text = ''
        for page in reader.pages:
            text += page.extract_text() or ''

        # Extract skills
        resume_skills = extract_skills_from_text(text)
        job_skills = extract_skills_from_text(job_description)

        matched = list(set(resume_skills) & set(job_skills))
        missing = list(set(job_skills) - set(resume_skills))

        match_score = 0
        if job_skills:
            match_score = round((len(matched) / len(job_skills)) * 100)

        return jsonify({
            'text': text,
            'skills': resume_skills,
            'job_skills': job_skills,
            'match': {
                'score': match_score,
                'matched': matched,
                'missing': missing
            }
        })

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Failed to process PDF'}), 500

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Failed to process PDF'}), 500

if __name__ == '__main__':
    app.run(port=5001)
