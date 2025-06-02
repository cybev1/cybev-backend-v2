
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateAISummary = async (req, res) => {
  try {
    const prompt = `
Based on recent data, generate a concise summary:
- Token price has fluctuated slightly.
- Market cap shows moderate stability.
- Viewer engagement in livestreams increased by 15%.
- Over 25,000 tokens were staked this week.
- Summarize performance in a professional, encouraging tone.

Format:
"This week on CYBEV..."
`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });

    const aiText = chatCompletion.choices[0].message.content;
    res.json({ summary: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI summary generation failed.' });
  }
};
