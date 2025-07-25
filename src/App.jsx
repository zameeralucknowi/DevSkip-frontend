// App.jsx
import Body from "./Components/Body";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from 'react-router';
import Profile from "./Components/Profile";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Chat from "./Components/Chat";
import FloatingChatButton from "./Components/FloatingChatButton";
import ChatWindow from "./Components/ChatWindow";
import { useState } from "react";
import MockInterview from "./Components/MockInterview";
import Interview from "./Components/Interview";


function AppWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const closeChat = () => setIsChatOpen(false);

  const user = useSelector((store)=>store.user);

  return (
    <>
      {user && <FloatingChatButton toggleChat={toggleChat}/>}
      {isChatOpen && <ChatWindow closeChat={closeChat} />}
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={user?<Feed />:<Login/>} />
          <Route path="/login" element={!user && <Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/mockInterview" element={<MockInterview />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/chat/:recieverId/:recieverName" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AppWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
