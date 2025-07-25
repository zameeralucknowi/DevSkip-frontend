// FloatingChatButton.jsx
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';


const FloatingChatButton = ({toggleChat}) => {

  return (
    <>
      <button 
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 cursor-pointer "
        onClick={toggleChat}
      >
        🤖 Ask AI
      </button>
    </>
  );
};

export default FloatingChatButton;
