import React, { useEffect, useRef } from "react";
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
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <Box
      px={4}
      display="flex"
      flexDirection="column"
      overflowY="auto"
      h="100%"
      flex="1"
    >
      <div>
        {messages &&
          messages.map((m, i) => (
            <div
              style={{ display: "flex" }}
              key={m._id}
              ref={i === messages.length - 1 ? lastMessageRef : null}
            >
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
      </div>
    </Box>
  );
};

export default ScrollableChat;
