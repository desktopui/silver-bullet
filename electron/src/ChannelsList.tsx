import React, { useState } from "react";
import styled from "styled-components";
import { WebClient } from "@slack/client";
import { useAsyncEffect } from "use-async-effect";

const Channels = styled.div`
  width: 30%;
  min-width: 200px;
  background: #7d6969;
  padding: 2em 0em;
`;

const Channel = styled.a<{ active: boolean }>`
  padding: 0.25em 2em;
  color: white;
  display: block;
  text-decoration: none;
  background-color: ${props => (props.active ? "darkkhaki" : "transparent")};

  &:hover {
    background-color: ${props => (props.active ? "darkkhaki" : "gray")};
  }
`;

const Hashtag = styled.span`
  color: #aaa;
  padding-right: 5px;
`;

export interface SlackConversation {
  name: string;
  id: string;
  topic: {
    value: string;
  };
}

function getAllChannels(web: WebClient): Promise<SlackConversation[]> {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: "public_channel",
    limit: 20
  };

  return web.conversations.list(param).then(results => {
    return (results as any).channels as Array<SlackConversation>;
  });
}

const useSlack = (
  token: string
): { data: Array<SlackConversation>; loading: boolean } => {
  const [data, setData] = useState([] as Array<SlackConversation>);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(
    async () => {
      const web = new WebClient(token);
      try {
        const response = await getAllChannels(web);
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
  const { data, loading } = useSlack(token);
  return (
    <Channels>
      {loading && <span>Loading...</span>}
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
