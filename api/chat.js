import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Vercelに設定した環境変数からAPIキーを取得
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

	// OpenAI APIにリクエストを送信
	const response = await openai.createChatCompletion({
	  model: 'gpt-3.5-turbo',
	  messages: [
		{ role: 'system', content: 'あなたは釘宮理恵風のツンデレキャラクターです。' },
		{ role: 'user', content: message },
	  ],
	});

	// 成功時のレスポンス
	res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
	// エラー内容をログに出力
	console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);

	// 500エラーを返す
	res.status(500).json({
	  error: 'Internal server error',
	  details: error.response ? error.response.data : error.message,
	});
  }
}