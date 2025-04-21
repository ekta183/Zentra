import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChatProvider";
import {
  isSameSender,
  isSameUser,
  isLastMessage,
  isSameSenderMargin,
} from "../../config/ChatLogics";
import { Avatar, Box } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { useId } from "react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const tooltipId = useId();
  return (
    <Box height="100%" overflowY="auto">
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  ids={{ trigger: tooltipId }}
                  content={m.sender.name}
                  positioning={{ placement: "bottom-right" }}
                >
                  <Avatar.Root
                    ids={{ root: tooltipId }}
                    shape="full"
                    size="sm"
                    cursor="pointer"
                    mr={1}
                    mt="7px"
                  >
                    <Avatar.Image src={m.sender.pic} />
                    <Avatar.Fallback name={m.sender.name} />
                  </Avatar.Root>
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}

        {/* {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="left" hasArrow>
                <Avatar
                  name={m.sender.name}
                  src={m.sender.pic}
                  size="sm"
                  cursor="pointer"
                  mr={1}
                  mt="7px"
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))} */}
      </ScrollableFeed>
    </Box>
  );
};

export default ScrollableChat;
