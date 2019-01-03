import React from "react";
import styled from "styled-components";

const ChannelH1 = styled.div`
  padding: 0.5em;
  background-color: #f5f3f3;
  text-align: center;
  justify-content: center;
  font-size: 1.5em;
  color: #555;
`;

const Subtitle = styled.div`
  font-size: 0.5em;
  color: #888;
`;

export default function ChannelHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <ChannelH1>
      #{title}
      <Subtitle>{subtitle}</Subtitle>
    </ChannelH1>
  );
}
