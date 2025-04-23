import React, { useState, useRef } from "react";
import { Toaster, toaster } from "../ui/toaster";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Field, Input, Spinner, Text } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";
import { getSenderFull } from "../../config/ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import { useEffect } from "react";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "https://zentra-backend-i9va.onrender.com";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const messageEndRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"], // ensures WebSocket transport
      autoConnect: true, // reconnects automatically if the connection drops
    });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (istyping && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [istyping]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://zentra-backend-i9va.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        // console.log(data);
        socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (error) {
        toaster.create({
          title: "Error Occured!",
          description: "Failed to send the Message",
          type: "error",
          duration: 5000,
          meta: {
            closable: true,
          },
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://zentra-backend-i9va.onrender.com/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "25px", md: "28px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              color="black"
              backgroundColor="gray.200"
              _hover={{ bg: "gray.600", color: "black" }}
              _active={{ bg: "gray.800", color: "black" }}
              variant="subtle"
              display={{ base: "flex", md: "none" }}
              onClick={() => setSelectedChat("")}
            >
              <IoMdArrowBack />
            </IconButton>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            height="100%"
            borderRadius="lg"
            overflowY="auto"
          >
            {/* Message + Typing Indicator Container */}
            <Box
              display="flex"
              flexDirection="column"
              flex="1"
              overflowY="auto"
              ref={messageEndRef}
            >
              {loading ? (
                <Box
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner size="xl" w={20} h={20} />
                </Box>
              ) : (
                <>
                  <ScrollableChat messages={messages} istyping={istyping} />
                </>
              )}
            </Box>

            {/* Input Field */}
            <Field.Root onKeyDown={sendMessage} required mt={3}>
              <Input
                placeholder="Enter a message.."
                variant="filled"
                bg="#E0E0E0"
                onChange={typingHandler}
                value={newMessage}
              />
            </Field.Root>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
      <Toaster />
    </>
  );
};

export default SingleChat;
