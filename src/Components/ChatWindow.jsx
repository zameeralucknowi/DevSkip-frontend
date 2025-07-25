import { useState, useRef, useEffect } from 'react';
import publicRequest from '../utils/requestMethods';

const ChatWindow = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToAI = async () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', content: newMessage }]);

    try {
      const formattedPrompt = `Answer the following in 4 short, bullet-pointed statements:\n${newMessage}`;
      const response = await publicRequest.post(
        '/ask/ai',
        { prompt: formattedPrompt },
        { withCredentials: true }
      );

      const formattedResponse = response.data.response.replace(/\*\s?/g, '• ').trim();

      setMessages((prev) => [...prev, { sender: 'ai', content: formattedResponse }]);
      setNewMessage('');
    } catch (err) {
      console.error('AI request failed:', err);
      setMessages((prev) => [
        ...prev,
        { senderId: 'ai', content: '⚠️ AI response failed. Try again later.' },
      ]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] sm:w-[26rem] h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border">
      {/* Header */}
      <div className="bg-base-300 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
        <h2 className="text-lg font-bold">Ask AI Assistant</h2>
        <button onClick={closeChat} className="text-xl hover:text-red-500">×</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-base-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-accent' : 'chat-bubble-primary'}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t bg-base-100 rounded-b-2xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask something..."
          className="input input-bordered w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendToAI()}
        />
        <button className="btn btn-primary" onClick={sendToAI}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
