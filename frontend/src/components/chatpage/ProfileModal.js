import React from "react";
import { Dialog, Portal, Button, CloseButton, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ProfileModal = ({ user, children }) => {
  return (
    <div>
      <Dialog.Root placement="center" bg="white" color="black">
        <Dialog.Trigger asChild>
          {children ? (
            <span>{children}</span>
          ) : (
            <Button
              display={{ base: "flex" }}
              color="black"
              backgroundColor="gray.200"
              _hover={{ bg: "gray.600", color: "black" }}
              _active={{ bg: "gray.800", color: "black" }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          )}
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
                  {user.name}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Avatar.Root
                  shape="full"
                  size="2xl"
                  cursor="pointer"
                  boxSize="150px"
                >
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image src={user.pic} />
                </Avatar.Root>
                <Text
                  fontSize={{ base: "28px", md: "30px" }}
                  fontFamily="Work sans"
                >
                  {" "}
                  Email: {user.email}
                </Text>
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
    </div>
  );
};

export default ProfileModal;
