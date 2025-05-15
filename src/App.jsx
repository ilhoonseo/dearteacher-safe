import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ 서버 응답 에러:', errorText);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontSize: '2rem' }}>👩‍🏫 교사 민원 상담 챗봇</h1>

      <div style={{ height: 300, overflowY: 'scroll', border: '1px solid gray', padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{msg.role === 'user' ? '선생님' : '챗봇'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flexGrow: 1, padding: 8 }}
          placeholder="민원 때문에 힘든 상황을 입력해 보세요"
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px' }}>전송</button>
      </div>
    </div>
  );
}

export default App;
