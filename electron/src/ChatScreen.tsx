import React, { useState } from "react";

import styled from "styled-components";
import ChannelList from "./ChannelList";
import ChannelHeader from "./ChannelHeader";
import ChatMessages from "./ChatMessages";
import useLocalStorage from "./useLocalStorage";
import { SlackConversation, useRTM } from "./api";
import useWindowSize from "./useWindowSize";

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
  width: -webkit-fill-available;
  padding: 1em;
  font-size: 1.2em;
`;

interface ChatScreenProps {
  token: string;
}

export default function ChatScreen({ token }: ChatScreenProps) {
  const [activeChannel, setActiveChannel] = useLocalStorage("activeChannel");
  // const rtm = useRTM(token);
  // const windowSize = useWindowSize();
  // if (windowSize.innerWidth < 400) {
  //   console.log("TRIGGER COLAPSE");
  // }
  return (
    <Frame>
      <ChannelList
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
          <ChatMessages token={token} activeChannel={activeChannel} />
          <div>
            <Input placeholder="Write a message..." />
          </div>
        </MessagesBlock>
      )}
    </Frame>
  );
}
