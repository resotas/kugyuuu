import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]); // 初期メッセージを削除
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    setMessages([...messages, { id: messages.length + 1, sender: 'user', text: userMessage }]);
    setUserMessage('');

    // AIの応答をモックデータで追加（API呼び出しを追加する場合はここで処理）
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: 'ai', text: 'それ、すっごく気になるんだけど！' },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">釘宮理恵チャット</div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  );
}

export default App;