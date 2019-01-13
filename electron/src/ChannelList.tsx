import React from "react";
import styled from "styled-components";
import { useSlackApi, SlackConversation, getAllChannels, fetchMe } from "./api";
import BottomBar from "./BottomBar";

const Channels = styled.div`
  width: 30%;
  min-width: 200px;
  background: #695151;
  padding: 2em 0em;
  @media (max-width: 500px) {
    background: palevioletred;
    width: 50px;
    min-width: 50px;
    transition: ease-in-out all 0.3s;
  }
  transition: ease-in-out all 0.3s;
`;

const Channel = styled.a<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 0.25em 0;
  padding-left: 1.2em;
  color: ${props => (props.active ? "white" : "#eee")};
  display: block;
  font-size: 1.2em;
  text-decoration: none;
  justify-content: center;
  background-color: ${props => (props.active ? "darkkhaki" : "transparent")};
  &:hover {
    background-color: ${props => (props.active ? "darkkhaki" : "gray")};
  }
  @media (max-width: 500px) {
    transition: ease-in-out all 0.3s;
    padding-left: 0.5em;
  }
  transition: ease-in-out all 0.3s;
`;

const Title = styled.span`
  display: inline;
  @media (max-width: 500px) {
    max-height: 0px;
    max-width: 0px;
    opacity: 0;
    transition: ease-in all 0.3s;
    display: inline-block;
  }
  transition: ease-in all 0.3s;
`;

const Number = styled.span`
  font-size: 0.8em;
  font-weight: bold;
  opacity: 0;
  @media (max-width: 500px) {
    opacity: 1;
    transition: ease-in all 0.3s;
  }
  transition: ease-in all 0.3s;
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
  @media (max-width: 500px) {
    color: white;
    transition: color 0.3s ease-in-out;
  }
  transition: color 0.3s ease-in-out;
`;

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
  const [channels, loading] = useSlackApi(
    activeChannel,
    async () => await getAllChannels(token)
  );

  const [me, meLoading] = useSlackApi(
    activeChannel,
    async () => await fetchMe(token)
  );

  return (
    <Channels>
      {loading && <Loading>Loading...</Loading>}
      {channels.map((c: SlackConversation, i: number) => (
        <Channel
          active={activeChannel ? c.id == activeChannel.id : false}
          key={c.name}
          title={c.name}
          href={`#${c.name}`}
          onClick={() => onChannelSelect(c)}
        >
          <Hashtag>#</Hashtag>
          <Title>{c.name}</Title>
          <Number>{i}</Number>
        </Channel>
      ))}
      {me && me[0] && <BottomBar user={me[0]!} />}
    </Channels>
  );
}
