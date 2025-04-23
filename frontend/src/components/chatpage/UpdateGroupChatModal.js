import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Toaster, toaster } from "../ui/toaster";
import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Fieldset,
  Input,
  Field,
  Box,
} from "@chakra-ui/react";
import UserListItem from "../UserAvatar/UserListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: error?.response?.data || "Something went wrong.",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toaster.create({
        title: "Only admins can remove someone!",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: error?.response?.data || "Something went wrong.",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toaster.create({
        title: "User Already in group!",
        type: "warning",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toaster.create({
        title: "Only admins can add someone!",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: error?.response?.data || "Something went wrong.",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toaster.create({
        title: "Error loading users",
        description: "Failed to load the search results.",
        type: "error",
        duration: 5000,
        meta: {
          closable: true,
        },
      });
    }
  };
  return (
    <div>
      <Dialog.Root placement="center" bg="white" color="black">
        <Dialog.Trigger asChild>
          <Button
            display={{ base: "flex" }}
            color="black"
            backgroundColor="gray.200"
            _hover={{ bg: "gray.600", color: "black" }}
            _active={{ bg: "gray.800", color: "black" }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop zIndex="999" />
          <Dialog.Positioner zIndex="1000">
            <Dialog.Content
              bg="white"
              color="black "
              zIndex="1001"
              // height="400px"
            >
              <Dialog.Header>
                <Dialog.Title
                  fontSize="35px"
                  fontFamily="Work sans"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  width="100%"
                  p="6px"
                >
                  {selectedChat.chatName}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  w="100%"
                  display="flex"
                  flexWrap="wrap"
                  width="100%"
                  pb={3}
                >
                  {selectedChat.users.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleRemove(u)}
                    />
                  ))}
                </Box>
                <Fieldset.Root display="flex" width="100%" mb={3}>
                  <Fieldset.Content width="100%">
                    <Box display="flex" alignItems="center" width="100%">
                      <Input
                        name="chatname"
                        placeholder="Chat Name"
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                        borderColor="gray.200"
                        focusBorderColor="gray.900"
                        flex="1"
                        mr={2}
                      />
                      <Dialog.ActionTrigger asChild>
                        <Button
                          variant="solid"
                          colorPalette="teal"
                          isLoading={renameloading}
                          onClick={handleRename}
                        >
                          Update
                        </Button>
                      </Dialog.ActionTrigger>
                    </Box>
                    <Field.Root>
                      <Input
                        name="add users"
                        placeholder="Add Users"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                        borderColor="gray.200"
                        focusbordercolor="gray.900"
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
                {loading ? (
                  // <ChatLoading />
                  <div>Loading...</div>
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                      />
                    ))
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    type="submit"
                    alignSelf="flex-end"
                    varient="subtle"
                    colorPalette="red"
                    onClick={() => handleRemove(user)}
                  >
                    Leave Group
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  // onClick={() => setIsDrawerOpen(false)}
                  color="black"
                  size="sm"
                  _hover={{ bg: "gray.200", color: "black" }}
                  _active={{ bg: "gray.300", color: "black" }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Toaster />
    </div>
  );
};

export default UpdateGroupChatModal;
