import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 環境変数からAPIキーを取得
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // POSTリクエスト以外の場合のエラーハンドリング
  if (req.method !== 'POST') {
	res.status(405).json({ error: 'Method not allowed' });
	return;
  }

  try {
	const { message } = req.body;

	// メッセージが空の場合のエラー
	if (!message || message.trim() === '') {
	  res.status(400).json({ error: 'Message is required' });
	  return;
	}

	// OpenAI APIリクエスト
	const response = await openai.createChatCompletion({
	  model: 'gpt-3.5-turbo',
	  messages: [
		{ role: 'system', content: 'あなたは釘宮理恵風のツンデレキャラクターです。' },
		{ role: 'user', content: message },
	  ],
	});

	// 成功レスポンス
	res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
	console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);

	// エラーレスポンス
	res.status(500).json({
	  error: 'Internal server error',
	  details: error.response ? error.response.data : error.message,
	});
  }
}