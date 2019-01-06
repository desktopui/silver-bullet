import styled from "styled-components";
import React from "react";
import { SlackMessage, SlackUser } from "./api";
import moment, { Moment } from "moment";
import Markdown from "react-markdown";
import Link from "./Link";
import Attachment from "./Attachment";

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  padding: 0em 0.5em;
`;

const AvatarContainer = styled.div`
  min-width: 46px;
  align-items: center;
`;
export const Avatar = styled.img`
  border-radius: 18px;
  margin-right: 0.5em;
`;

export const MessageText = styled.p<{ system: boolean }>`
  color: ${props => (props.system ? "gray" : "black")};
  margin: 0em;
  line-height: 1.5em;
`;

const MarkdownP = styled.span``;

const calendarSpec = {
  sameDay: "[Today]",
  lastDay: "[Yesterday]",
  lastWeek: "dddd, MMMM Do YYYY",
  sameElse: "DD MMMM YYYY"
};

const StyledRowSeparator = styled.div`
  padding: 2em 1.5em;
  display: flex;
  flex-direction: row;
  font-size: 0.7em;
  font-weight: bold;
  flex: 1;
  color: #555;
  align-items: center;
`;

const Line = styled.div`
  height: 1px;
  flex: 1;
  background-color: #ddd;
`;

function DateSeparator({ timestamp }: { timestamp: string }) {
  const date = toDate(timestamp);
  return (
    <StyledRowSeparator>
      <Line />
      <span style={{ margin: "0 1em" }}>
        {date.calendar(moment(), calendarSpec)}
      </span>
      <Line />
    </StyledRowSeparator>
  );
}

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.span`
  color: gray;
  font-size: 0.8em;
  margin-left: 1em;
`;

function toDate(timestamp: string): Moment {
  return moment(parseFloat(timestamp) * 1000);
}

interface MessageProps {
  message: SlackMessage;
  prevMessage?: SlackMessage;
  user: SlackUser;
  users: SlackUser[];
}

export function Message({ message, prevMessage, user, users }: MessageProps) {
  const isNewDay = prevMessage
    ? toDate(message.ts).diff(toDate(prevMessage.ts), "days") > 0
    : true;
  const isNewUser = prevMessage
    ? isNewDay || message.user !== prevMessage.user
    : true;
  return (
    <div>
      {isNewDay && <DateSeparator timestamp={message.ts} />}
      <RowWrapper>
        {/* {Object.keys(message).join(" ")} */}
        <AvatarContainer>
          {isNewUser && (
            <Avatar src={user.profile.image_48} width="36" height="36" />
          )}
        </AvatarContainer>
        <div>
          {isNewUser && (
            <NameContainer>
              <strong>{user.profile.display_name}</strong>
              <Time>{toDate(message.ts).format("HH:mm")}</Time>
            </NameContainer>
          )}
          {message.files && <Attachment {...message.files[0]} />}
          <MessageText system={!!message.subtype}>
            <Markdown
              source={extractMentions(message.text, user, users)}
              renderers={{ link: Link, paragraph: MarkdownP }}
            />
          </MessageText>
        </div>
      </RowWrapper>
    </div>
  );
}

const regex = /<@(.*)>/gm;
function extractMentions(
  message: string,
  currentUser: SlackUser,
  users: Array<SlackUser>
) {
  // <@UC7QVJNRW> has joined the channel
  return message.replace(regex, (s, p1) => {
    const user = users.find(u => u.id == p1);
    if (user && user.id == currentUser.id) {
      return "";
    }
    return `__${user ? user.name : p1}__`;
  });
}
