import React, { useState } from "react";
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
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user, chats, setChats, setSelectedChat } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toaster.create({
        title: "User already added",
        type: "warning",
        duration: 5000,
        meta: {
          closable: true,
        },
      });

      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
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
        `https://zentra-backend-i9va.onrender.com/api/user?search=${search}`,
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

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toaster.create({
        title: "Missing information",
        description: "Please fill all the fields.",
        type: "warning",
        duration: 5000,
        meta: {
          closable: true,
        },
      });

      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://zentra-backend-i9va.onrender.com/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setSelectedChat(data);
      toaster.create({
        title: "New Group Chat Created!",
        type: "success",
        duration: 5000,
        meta: {
          closable: true,
        },
      });

      setGroupChatName("");
      setSelectedUsers([]);
      setSearch("");
      setSearchResult([]);
    } catch (error) {
      toaster.create({
        title: "Failed to create group chat",
        description: error?.response?.data || "Something went wrong.",
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
      <Dialog.Root
        placement="center"
        bg="white"
        color="black"
        // open={isDrawerOpen}
        // onOpenChange={setIsDrawerOpen}
      >
        <Dialog.Trigger asChild>
          <span>{children}</span>
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
                  Create Group Chat
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Fieldset.Root>
                  {/* <Stack>
                    <Fieldset.Legend>Contact details</Fieldset.Legend>
                    <Fieldset.HelperText>
                      Please provide your contact details below.
                    </Fieldset.HelperText>
                  </Stack> */}

                  <Fieldset.Content>
                    <Field.Root>
                      {/* <Field.Label>Chat Name</Field.Label> */}
                      <Input
                        name="chatname"
                        placeholder="Chat Name"
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                        borderColor="gray.200"
                        focusbordercolor="gray.900"
                      />
                    </Field.Root>

                    <Field.Root>
                      {/* <Field.Label>Add Users</Field.Label> */}
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
                {/* selected users */}
                <Box w="100%" display="flex" flexWrap="wrap" width="100%">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
                {/* reneder searched users */}
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
                        handleFunction={() => handleGroup(user)}
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
                    colorPalette="teal"
                    onClick={handleSubmit}
                  >
                    Create Chat
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

export default GroupChatModal;
