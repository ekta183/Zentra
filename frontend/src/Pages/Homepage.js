import React from "react";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={5}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="  5xl"
          // fontWeight="bold"
          fontFamily="Work sans"
          color="black"
        >
          Zentra - Smart Chat, Smarter Emotions
        </Text>
      </Box>
      <Box
        p={4}
        bg={"white"}
        w="100%"
        // m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
        justifyContent="center"
      >
        <Tabs.Root
          defaultValue="login"
          variant="subtle"
          colorPalette="teal"
          colorScheme="teal"
          maxW="full"
        >
          <Tabs.List rounded="15" p="1" mb="1em">
            <Tabs.Trigger value="login" maxW="full">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="signup" maxW="full">
              SignUp
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Homepage;
