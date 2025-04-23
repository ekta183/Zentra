import { Box, Button, Text, Drawer, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Tooltip } from "../ui/tooltip";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretDown,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Portal, Avatar } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { Spinner, Badge } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogics";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const accessChat = async (userId, store) => {
    // console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      store.setOpen(false);
      // setIsDrawerOpen(false);
    } catch (error) {
      toast.error(`Error fetching the chat! ${error.message}`, {
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

  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please Enter something in search", {
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

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error Occured! Failed to Load the Search Results", {
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
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="whiteAlpha.800"
        color="black"
      >
        <Drawer.Root placement="start" bg="white" color="black">
          <Tooltip
            content="Search Users to Chat"
            showArrow
            positioning={{ placement: "right-end" }}
          >
            <Drawer.Trigger asChild>
              <Button
                variant="ghost"
                color="black"
                _hover={{ bg: "gray.200", color: "black" }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <Text display={{ base: "none", md: "flex" }} px="4">
                  Search User
                </Text>
              </Button>
            </Drawer.Trigger>
          </Tooltip>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="white" color="black ">
                <Drawer.Context>
                  {(store) => (
                    <>
                      <Drawer.Header borderBottomWidth="1px" borderColor="gray">
                        <Drawer.Title>Search Users</Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Box display="flex" pb={2}>
                          <Input
                            placeholder="Search by name or email"
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <Button
                            colorPalette="teal"
                            variant="subtle"
                            onClick={handleSearch}
                          >
                            Go
                          </Button>
                        </Box>
                        {loading ? (
                          <ChatLoading />
                        ) : (
                          searchResult?.map((user) => (
                            <UserListItem
                              key={user._id}
                              user={user}
                              handleFunction={() => accessChat(user._id, store)}
                            />
                          ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                      </Drawer.Body>
                      {/* <Drawer.Footer>

            </Drawer.Footer> */}
                      {/* <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" _hover={{ bg: "gray.200", color: "black" }}
                _active={{ bg: "gray.300", color: "black" }}/>
            </Drawer.CloseTrigger> */}
                    </>
                  )}
                </Drawer.Context>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Text fontSize="xl" fontFamily="Work sans" color="black">
          Zentra{" "}
          <Box as="span" display={{ base: "none", md: "inline" }}>
            – Smart Chat, Smarter Emotions
          </Box>
        </Text>
        <div>
          <Menu.Root variant="subtle" colorPalette="gray" closeOnSelect="true">
            <Menu.Trigger asChild>
              <Box position="relative" display="inline-block">
                {/* Bell Icon */}
                <FontAwesomeIcon
                  icon={faBell}
                  size="xl" // Set the icon size
                  style={{ color: "black" }} // You can customize the icon's style here
                />

                {/* Badge for Notifications */}
                {notification.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-5px"
                    right="-5px"
                    borderRadius="full"
                    // colorPalette="green"
                    backgroundColor="red"
                    fontSize="sm"
                    size="sm"
                    px={2}
                  >
                    {notification.length}
                  </Badge>
                )}
              </Box>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="white"
                  color="black"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="black"
                  borderWidth="1px"
                >
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <Menu.Item
                      color="black"
                      _hover={{ bg: "gray.300" }}
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            notif.chat.users
                          )}`}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Root closeOnSelect="true">
            <Menu.Trigger asChild>
              <Button
                variant="ghost"
                color="black"
                bg="transparent"
                _hover={{ bg: "gray.200", color: "black" }}
                _active={{ bg: "gray.300", color: "black" }}
                _focus={{ bg: "transparent", color: "black" }}
                isFocusable={false}
                size="sm"
              >
                <Avatar.Root shape="full" size="sm" cursor="pointer">
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image src={user.pic} />
                </Avatar.Root>
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="white"
                  color="black"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="black"
                  borderWidth="1px"
                >
                  <ProfileModal user={user}>
                    <Menu.Item
                      value="profile"
                      color="black"
                      _hover={{ bg: "gray.300" }}
                      closeOnSelect={false}
                    >
                      Profile
                    </Menu.Item>
                  </ProfileModal>
                  <Menu.Separator />
                  <Menu.Item
                    value="logout"
                    color="black"
                    _hover={{ bg: "gray.300" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </div>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default SideDrawer;
