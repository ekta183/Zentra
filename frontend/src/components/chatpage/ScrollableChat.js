import React, { useEffect, useRef } from "react";
import { Box, Avatar } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import {
  isSameSender,
  isSameUser,
  isLastMessage,
  isSameSenderMargin,
} from "../../config/ChatLogics";
import { Tooltip } from "../ui/tooltip";
import { useId } from "react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const tooltipId = useId();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box display="flex" flexDir="column" h="100%" overflowY="auto" px={4}>
      <Box display="flex" flexDir="column" mt="auto">
        {messages &&
          messages.map((m, i) => (
            <Box display="flex" key={m._id}>
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
                  backgroundColor:
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </Box>
          ))}
        {/* This invisible box keeps scroll at the bottom */}
        <div ref={bottomRef} />
      </Box>
    </Box>
  );
};

export default ScrollableChat;
