import React from "react";
import styled from "styled-components";
import { SlackUser } from "./api";

const Panel = styled.div`
  bottom: 2em;
  padding: 1em;
  position: absolute;
  overflow: hidden;
  transform: scaleX(1);
  transform-origin: top left;
  align-items: center;
  @media (max-width: 500px) {
    display: none;
  }
  transition: all 0.3s;
`;

const Button = styled.button`
  font-size: 1em;
  background: white;
`;

const Name = styled.span`
  padding: 0 0.5em;
  color: white;
  font-weight: bold;
`;
export default function BottomBar({ user }: { user: SlackUser }) {
  return (
    <Panel>
      <Name>@{user.profile.display_name}</Name>
      <Button onClick={() => (localStorage.clear(), window.location.reload())}>
        Sign out
      </Button>
    </Panel>
  );
}
