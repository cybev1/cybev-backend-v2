const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

router.post('/ai/generate-post', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = response.data.choices[0].message.content;
    res.status(200).json({
      title: content.split('\n')[0],
      content
    });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ message: 'AI generation failed' });
  }
});

module.exports = router;