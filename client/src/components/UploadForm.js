import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [skills, setSkills] = useState([]);
  const [match, setMatch] = useState(null);
  const [jobSkills, setJobSkills] = useState([]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setMessage(res.data.message);
      setText(res.data.text);
      setSkills(res.data.skills || []);
      setJobSkills(res.data.job_skills || []);
      setMatch(res.data.match || null);
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err);
    }
  };

  return (
    <div className="upload-form-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="logo-icon">📄</div>
        <h1 className="title-gradient">SkillMatch AI</h1>
        <p className="subtitle">
          Upload your resume and compare it to any job description.
          Instantly see how well you match!
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleChange} />
        <textarea
          placeholder="Paste job description here..."
          rows={6}
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button type="submit">Upload Resume</button>
      </form>

      {message && <p className="status-message">{message}</p>}

      {match && (
        <div className="match-results card">
          <h2>🎯 Resume Match Score</h2>
          <p><strong>Score:</strong> {match.score}%</p>
          <p><strong>Matched Skills:</strong> {match.matched.join(", ")}</p>
          <p><strong>Missing Skills:</strong> {match.missing.join(", ") || "None"}</p>
        </div>
      )}

      {jobSkills.length > 0 && (
        <div className="skills-section card">
          <h2>📝 Job Description Skills</h2>
          <div className="skills-tags">
            {jobSkills.map((skill, index) => (
              <span className="tag" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="skills-section card">
          <h2>📄 Detected Resume Skills</h2>
          <div className="skills-tags">
            {skills.map((skill, index) => (
              <span className="tag" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {text && (
        <div className="resume-section card">
          <h2>🧾 Resume Text</h2>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
