// routes/ai.routes.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ Route: POST /api/ai/generate-post
router.post('/ai/generate-post', async (req, res) => {
  try {
    const { title, words } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Title is required and must be a string.' });
    }

    const prompt = `Write a ${words || 700}-word blog post titled "${title}". Format the response in SEO-optimized HTML. Include clear <h1>, <h2>, paragraphs, and use relevant formatting.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = completion.choices[0].message.content;

    res.status(200).json({
      title,
      content
    });
  } catch (err) {
    console.error('AI generation error:', err);
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
});

module.exports = router;
