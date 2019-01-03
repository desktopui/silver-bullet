import React, { useState } from "react";

import styled from "styled-components";
import ChannelsList, { SlackConversation } from "./ChannelsList";
import ChannelHeader from "./ChannelHeader";

const Frame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const MessagesBlock = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  font-size: 1.2em;
`;

const Message = styled.div``;

interface ChatScreenProps {
  token: string;
}

export default function ChatScreen({ token }: ChatScreenProps) {
  const messages = [{ text: "text 1" }];
  const [activeChannel, setActiveChannel] = useState<SlackConversation | null>(
    null
  );

  console.log(activeChannel);
  return (
    <Frame>
      <ChannelsList
        token={token}
        activeChannel={activeChannel}
        onChannelSelect={channel => setActiveChannel(channel)}
      />
      {activeChannel && (
        <MessagesBlock>
          <ChannelHeader
            title={activeChannel.name}
            subtitle={activeChannel.topic.value}
          />
          <div>
            {messages.map((m, i) => (
              <Message key={i}>{m.text}</Message>
            ))}
          </div>
          <div>
            <Input placeholder="Write a message..." />
          </div>
        </MessagesBlock>
      )}
    </Frame>
  );
}
