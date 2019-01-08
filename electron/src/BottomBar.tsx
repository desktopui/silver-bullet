import React from "react";
import styled from "styled-components";
import { SlackUser } from "./api";

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 1em;
  align-items: center;
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
    <Footer>
      <Name>@{user.profile.display_name}</Name>
      <Button onClick={() => (localStorage.clear(), window.location.reload())}>
        Sign out
      </Button>
    </Footer>
  );
}
