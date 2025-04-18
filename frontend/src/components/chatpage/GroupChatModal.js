import React, { useState } from "react";
import { Dialog, Portal, Button, CloseButton, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  return (
    <div>
      <Dialog.Root placement="center" bg="white" color="black">
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
              height="400px"
            >
              <Dialog.Header>
                <Dialog.Title
                  fontSize="40px"
                  fontFamily="Work sans"
                  // display="flex"
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
                This Is body
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    color="black"
                    bg="transparent"
                    _hover={{ bg: "gray.200", color: "black" }}
                    _active={{ bg: "gray.300", color: "black" }}
                    size="sm"
                  >
                    Close
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  _hover={{ bg: "gray.200", color: "black" }}
                  _active={{ bg: "gray.300", color: "black" }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

export default GroupChatModal;
