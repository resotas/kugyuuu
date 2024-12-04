import './App.css';
import React, { useState } from 'react';

function App() {
  const [userMessage, setUserMessage] = useState(''); // ユーザーの入力
  const [chatReply, setChatReply] = useState(''); // AIからの返信
  const [error, setError] = useState(''); // エラーメッセージ

  // API呼び出し関数
  const sendMessage = async () => {
    if (!userMessage.trim()) {
      setError('メッセージを入力してください');
      return;
    }

    try {
      setError(''); // エラーをリセット
      const response = await fetch('https://kugyuuu.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('サーバーエラーが発生しました');
      }

      const data = await response.json();
      setChatReply(data.reply); // AIの返信をセット
      setUserMessage(''); // 入力をクリア
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>釘宮理恵チャット</h1>
      <p>ツンデレ彼女と会話を楽しみましょう！</p>

      {/* ユーザー入力フォーム */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="メッセージを入力..."
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          送信
        </button>
      </div>

      {/* エラーメッセージ表示 */}
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}

      {/* AIからの返信表示 */}
      {chatReply && (
        <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '20px' }}>
          <strong>AIの返信:</strong>
          <p>{chatReply}</p>
        </div>
      )}
    </div>
  );
}

export default App;