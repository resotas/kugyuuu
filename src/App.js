import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const generateReply = async (userInput) => {
    try {
      const response = await fetch('/api/chat', { // サーバーレス関数を呼び出す
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('サーバーエラー');
      }

      const data = await response.json();
      return data.reply || 'エラーが発生しました。もう一度試してください。';
    } catch (error) {
      console.error('APIエラー:', error);
      return 'サーバーエラーが発生しました。';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    const aiReply = await generateReply(input);
    const aiMessage = { text: aiReply, sender: 'ai' };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);

    setInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>釘宮理恵チャット</h1>
        <p>ツンデレ彼女と会話しましょう</p>
      </header>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
        />
        <button onClick={handleSend}>送信</button>
      </div>
    </div>
  );
};

export default App;