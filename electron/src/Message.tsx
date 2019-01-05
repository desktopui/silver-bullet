import styled from "styled-components";
import React from "react";
import { SlackMessage, SlackUser } from "./api";
import moment, { Moment } from "moment";

export const RowWrapper = styled.div`
  padding: 0.5em;
  display: flex;
  flex-direction: row;
`;

const AvatarContainer = styled.div`
  width: 46px;
  align-items: center;
`;
export const Avatar = styled.img`
  border-radius: 18px;
  margin-right: 0.5em;
`;

export const MessageText = styled.p<{ system: boolean }>`
  color: ${props => (props.system ? "gray" : "black")};
`;

const calendarSpec = {
  sameDay: "[Today]",
  lastDay: "[Yesterday]",
  lastWeek: "dddd, MMMM Do YYYY",
  sameElse: "DD MMMM YYYY"
};

const StyledRowSeparator = styled.div`
  padding: 1em 2em;
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
  margin-left: 0.5em;
`;

const MessageContainer = styled.div``;

// function Name({ user }: { user: SlackUser}) {

// }

function toDate(timestamp: string): Moment {
  return moment(parseFloat(timestamp) * 1000);
}

export function Message({
  message,
  prevMessage,
  user
}: {
  message: SlackMessage;
  prevMessage?: SlackMessage;
  user: SlackUser;
}) {
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
        <AvatarContainer>
          {isNewUser && (
            <Avatar src={user.profile.image_48} width="36" height="36" />
          )}
        </AvatarContainer>
        <MessageContainer>
          {isNewUser && (
            <NameContainer>
              <strong>{user.name}</strong>
              <Time>{toDate(message.ts).format("HH:mm")}</Time>
            </NameContainer>
          )}
          <MessageText system={!!message.subtype}>{message.text}</MessageText>
        </MessageContainer>
      </RowWrapper>
    </div>
  );
}
