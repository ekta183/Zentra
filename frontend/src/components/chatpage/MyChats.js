import React, { useState,useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast.error("Error Occured! Failed to Load the chats", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo"))); 
  fetchChats();
}, []);

  return (
    <div>
      <h1>MyChats</h1>
      <ToastContainer />
    </div>
  );
};

export default MyChats;
