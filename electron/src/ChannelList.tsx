import React from "react";
import styled from "styled-components";
import { useSlackApi, SlackConversation, getAllChannels, fetchMe } from "./api";
import Me from "./Me";

const Channels = styled.div`
  width: 30%;
  min-width: 200px;
  background: #695151;
  padding: 1em 0em;
  margin: 0;
  @media (max-width: 500px) {
    background: palevioletred;
    width: 50px;
    min-width: 50px;
    transition: ease-in-out all 0.3s;
  }
  transition: ease-in-out all 0.3s;
`;

interface ChannelProps {
  active: boolean;
}
const Channel = styled.a<ChannelProps>`
  flex-direction: row;
  padding: 0.25em 0;
  padding-left: 1.2em;
  color: ${props => (props.active ? "white" : "#eee")};
  display: flex;
  font-size: 1.2em;
  text-decoration: none;
  justify-content: flex-start;
  background-color: ${props => (props.active ? "darkkhaki" : "transparent")};
  &:hover {
    background-color: ${props => (props.active ? "darkkhaki" : "gray")};
  }
  @media (max-width: 500px) {
    transition: ease-in-out all 0.3s;
    padding-left: 0.4em;
  }
  transition: ease-in-out all 0.3s;
`;

const Title = styled.div`
  transform: scaleX(1);
  transform-origin: top left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  @media (max-width: 500px) {
    transition: ease-in all 0.25s;
    transform: scaleX(0);
    max-width: 0;
  }
  transition: ease-in all 0.3s;
`;

const Short = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  opacity: 0;
  @media (max-width: 500px) {
    opacity: 1;
    transition: ease-in all 0.3s;
    color: white;
  }
  transition: ease-in all 0.1s;
`;

const Loading = styled.div`
  padding: 2em;
  align-items: center;
  justify-content: center;
  color: #ccc;
`;

const Hashtag = styled.div`
  color: #ccc;
  padding-right: 2px;
  display: inline-block;
  @media (max-width: 500px) {
    color: white;
    transition: color 0.3s ease-in-out;
  }
  transition: color 0.3s ease-in-out;
`;

const Li = styled.li`
  list-style: none;
  padding: 0;
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
      {me && me[0] && <Me user={me[0]!} />}
      <nav aria-labelledby="sections-heading">
        <h3 id="sections-heading" style={{ margin: 0, visibility: "hidden" }}>
          Channel List
        </h3>
        <ul style={{ padding: 0, margin: 0 }}>
          {channels.map((c: SlackConversation, i: number) => (
            <Li key={c.name}>
              <Channel
                active={activeChannel ? c.id == activeChannel.id : false}
                title={c.name}
                href={`#${c.name}`}
                onClick={() => onChannelSelect(c)}
                aria-current={activeChannel ? "page" : undefined}
              >
                <Hashtag aria-hidden="true">#</Hashtag>
                <Title aria-label={`channel ${c.name}`}>{c.name}</Title>
                <Short aria-hidden="true">{c.name.slice(0, 2)}</Short>
              </Channel>
            </Li>
          ))}
        </ul>
      </nav>
    </Channels>
  );
}
