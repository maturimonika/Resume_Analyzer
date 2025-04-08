const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.send('✅ Backend is running.');
});

app.post('/upload', upload.single('resume'), async (req, res) => {
  const file = req.file;
  const jobDescription = req.body.jobDescription || "";

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const formData = new FormData();
    formData.append('resume', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('jobDescription', jobDescription); // 👈 Pass JD to Python

    const response = await axios.post(
      'http://127.0.0.1:5001/extract-text',
      formData,
      { headers: formData.getHeaders() }
    );

    res.send({
      message: 'Resume processed!',
      text: response.data.text,
      skills: response.data.skills || [],
      match: response.data.match || null, // 👈 Match score result
    });

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    res.status(500).send('Error processing resume.');
  }
});

app.listen(5000, () => {
  console.log('🚀 Backend server running at http://localhost:5000');
});
