import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import publicRequest from '../utils/requestMethods';

const Chat = () => {
  const { recieverId,recieverName} = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const senderId = user?._id;

  const socketRef = useRef(null); // ✅ This will store socket across renders

  function handleMessage() {
    if (socketRef.current && newMessage.trim()) {
      socketRef.current.emit('sendMessage', {
        fromUser: user.firstName,
        senderId,
        recieverId,
        message: newMessage
      });

      setMessages((prev) => [...prev, { senderId , content: newMessage }]);
      setNewMessage("");
    }
  }

  useEffect(() => {
    if (!user) return;

    try {

       const socket = createSocketConnection();
       socketRef.current = socket; // ✅ Save it

       console.log("Socket created and joining chat");

        socket.emit('joinChat', {
        fromUser: user.firstName,
        senderId,
        recieverId
        });

        async function  getAllMessages(){
          const res = await publicRequest.get(`/user/messages/${senderId}/${recieverId}`,
            {withCredentials:true});
            setMessages(res.data.data)
        }
    
        getAllMessages();

        socket.on('messageRecieved', ({ senderId, message }) => {
        setMessages((prev) => [...prev, { senderId, content: message }]);
        });

        return () => {
        console.log("Disconnecting socket");
        socket.disconnect();
    };

      
    } catch (error) {
      console.log(error)
    }
  }, [senderId, recieverId]);

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col border rounded-2xl shadow-lg bg-base-200 m-10">
      {/* Header */}
      <div className="bg-base-300 text-primary-content px-6 py-4 rounded-t-2xl text-xl font-bold">
        Chat with {recieverName}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.senderId === senderId ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`chat-bubble ${msg.senderId === senderId ? 'chat-bubble-accent' : 'chat-bubble-primary'}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-base-100 rounded-b-2xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
