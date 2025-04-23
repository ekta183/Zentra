import React from "react";
import { Badge } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorPalette="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name} <FontAwesomeIcon icon={faXmark} />
    </Badge>
  );
};

export default UserBadgeItem;
