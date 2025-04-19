import React, { useState } from "react";
import { Toaster, toaster } from "../ui/toaster";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";
import { getSenderFull } from "../../config/ChatLogics";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  return (
    <>
      {selectedChat ? (
        <Text
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
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/* <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                /> */}
              </>
            ))}
        </Text>
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
