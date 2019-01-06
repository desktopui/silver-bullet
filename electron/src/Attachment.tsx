import React from "react";
import styled from "styled-components";
import { SlackAttachment } from "./api";
import Link from "./Link";

const Wrapper = styled.div`
  padding: 1em;
  align-items: center;
`;

const Capture = styled.h4`
  color: darkgray;
`;

const Picture = styled.img`
  max-width: 300px;
  cursor: zoom-in;
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  }
`;

export default function Attachment(props: SlackAttachment) {
  console.log(props);
  return (
    <Wrapper>
      <Capture>{props.title}</Capture>
      <Link href={props.permalink}>
        <Picture src={props.thumb_720} alt={props.title} />
      </Link>
    </Wrapper>
  );
}
