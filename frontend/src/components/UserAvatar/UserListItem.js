import { Avatar, Box, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
const UserListItem = ({ user, handleFunction }) => {
  //   const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar.Root shape="full" size="sm" cursor="pointer" mr={2}>
        <Avatar.Fallback name={user.name} />
        <Avatar.Image src={user.pic} />
      </Avatar.Root>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
