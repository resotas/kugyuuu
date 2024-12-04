import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
	res.status(405).json({ error: 'Method not allowed' });
	return;
  }

  try {
	const { message } = req.body;

	if (!message || message.trim() === '') {
	  res.status(400).json({ error: 'Message is required' });
	  return;
	}

	const response = await openai.createChatCompletion({
	  model: 'gpt-3.5-turbo',
	  messages: [
		{ role: 'system', content: 'あなたは釘宮理恵風のツンデレキャラクターです。' },
		{ role: 'user', content: message },
	  ],
	});

	res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
	console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
	res.status(500).json({ error: 'Internal server error' });
  }
}