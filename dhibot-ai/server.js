// require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: "https://your-github-Maroju-Ramesh.github.io" })); // Restrict API access to your GitHub Pages
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY; // Secure API Key

// API Route for Chatbot
app.post('/api/gemini', async (req, res) => {
    try {
        const userInput = req.body.prompt;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            { prompt: userInput }
        );

        res.json(response.data);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
