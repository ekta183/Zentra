import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "../ChatLoading";
import GroupChatModal from "./GroupChatModal";
const MyChats = ({ fetchAgain }) => {
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

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      // console.log(data);
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
  }, [fetchAgain]);

  return (
    <>
      <Box
        display={{
          base: selectedChat ? "none" : "flex",
          md: "flex",
          lg: "flex",
        }}
        flexDir="column"
        alignItems="center"
        p={3}
        background="white"
        w={{ base: "100%", md: "34%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          display="flex"
          flexDir="row"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box fontSize={{ base: "20px", md: "23px" }} fontFamily="Work sans">
            <Box
              as="span"
              display={{ base: "inline", md: "none", lg: "inline" }}
            >
              My{" "}
            </Box>
            Chats
          </Box>
          <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: "18px", md: "10px", lg: "18px" }}
              fontFamily="Work sans"
              variant="subtle"
              color="black"
              bg="gray.200"
              _hover={{ bg: "gray", color: "black" }}
              size="sm"
            >
              <Box
                display={{ base: "none", sm: "inline" }}
                fontFamily="Work sans"
              >
                New Group Chat
              </Box>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={
                    selectedChat && selectedChat._id === chat._id
                      ? "#38B2AC"
                      : "#E8E8E8"
                  }
                  color={
                    selectedChat && selectedChat._id === chat._id
                      ? "white"
                      : "black"
                  }
                  px={3}
                  py={2}
                  borderRadius="lg"
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default MyChats;
