import React, { useState } from "react";
import styled from "styled-components";
import { WebClient } from "@slack/client";
import { useAsyncEffect } from "use-async-effect";
import { SlackConversation, getAllChannels } from "./api";

const Channels = styled.div`
  width: 30%;
  min-width: 200px;
  background: #7d6969;
  padding: 2em 0em;
`;

const Channel = styled.a<{ active: boolean }>`
  padding: 0.25em 2em;
  color: ${props => (props.active ? "white" : "#eee")};
  display: block;
  font-size: 1.2em;
  text-decoration: none;
  background-color: ${props => (props.active ? "darkkhaki" : "transparent")};
  &:hover {
    background-color: ${props => (props.active ? "darkkhaki" : "gray")};
  }
`;

const Loading = styled.div`
  padding: 2em;
  align-items: center;
  justify-content: center;
  color: #ccc;
`;

const Hashtag = styled.span`
  color: #ccc;
  padding-right: 5px;
`;

const useSlack = (
  token: string,
  onFirst: (conversation: SlackConversation) => void
): { data: Array<SlackConversation>; loading: boolean } => {
  const [data, setData] = useState([] as Array<SlackConversation>);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(
    async () => {
      const web = new WebClient(token);
      try {
        const response = await getAllChannels(web);
        if (response.length > 0) {
          onFirst(response[0]);
        }
        setData(response);
      } catch (e) {
        setData(e);
      }
      setLoading(false);
    },
    () => {},
    []
  );
  return { data, loading };
};

interface ChannelsListProps {
  token: string;
  activeChannel: SlackConversation | null;
  onChannelSelect: (channel: SlackConversation) => void;
}

export default function ChannelsList({
  token,
  activeChannel,
  onChannelSelect
}: ChannelsListProps) {
  const { data, loading } = useSlack(token, first => onChannelSelect(first));
  return (
    <Channels>
      {loading && <Loading>Loading...</Loading>}
      {data.map(c => (
        <Channel
          active={activeChannel ? c.id == activeChannel.id : false}
          key={c.name}
          href={`#${c.name}`}
          onClick={() => onChannelSelect(c)}
        >
          <Hashtag>#</Hashtag>
          {c.name}
        </Channel>
      ))}
    </Channels>
  );
}
