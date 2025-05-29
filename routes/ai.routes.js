const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ai/generate-post', async (req, res) => {
  try {
    const { title, words } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const prompt = `Write a ${words || 700}-word blog post titled "${title}" in HTML format. Include headings, subheadings, and make it SEO-friendly.`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = chatCompletion.choices[0].message.content;
    res.status(200).json({ title, content });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
});

module.exports = router;
