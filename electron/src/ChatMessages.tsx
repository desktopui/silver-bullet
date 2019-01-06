import React, { useEffect, useState, useRef } from "react";
import {
  SlackConversation,
  SlackMessage,
  useSlackApi,
  fetchMessages,
  fetchUsers
} from "./api";

import styled from "styled-components";
import { Message } from "./Message";

const Frame = styled.div`
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
`;

interface ChatMessagesProps {
  token: string;
  activeChannel: SlackConversation;
}

const EmptySpace = styled.div`
  margin: 0.2em 0em;
`;

function ChatMessages({ token, activeChannel }: ChatMessagesProps) {
  const listRef = useRef(null);
  useEffect(() => {
    // listRef.current && listRef.current.scrollToBottom();
  }, []);

  const [messages, messagesLoading] = useSlackApi(
    activeChannel,
    async () => await fetchMessages(token, activeChannel)
  );

  const [users, usersLoading] = useSlackApi(
    activeChannel,
    async () => await fetchUsers(token)
  );

  const loading = messagesLoading || usersLoading;

  return (
    <Frame ref={listRef}>
      {loading && <span>Loading..</span>}

      <EmptySpace />
      {!loading &&
        messages.map((message: SlackMessage, index: number) => (
          <Message
            key={message.ts}
            message={message}
            prevMessage={messages[index + 1]}
            user={users.find(u => u.id == message.user)!}
            users={users}
          />
        ))}
    </Frame>
  );
}

export default ChatMessages;
