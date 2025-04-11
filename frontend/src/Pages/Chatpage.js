import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const response = await axios.get("http://localhost:5000/api/chat");
    console.log(response);
    setChats(response.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chats</h1>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chatpage;
