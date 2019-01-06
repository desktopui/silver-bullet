import React from "react";
import styled from "styled-components";
import { SlackAttachment } from "./api";
import Link from "./Link";

const Wrapper = styled.div`
  padding: 0.5em;
  align-items: center;
`;

const Capture = styled.h4`
  color: darkgray;
  margin: 0;
  padding: 0.5em;
`;

const Picture = styled.img`
  max-width: 300px;
  cursor: zoom-in;
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  }
`;

export default function Attachment(props: SlackAttachment) {
  return (
    <Wrapper>
      <Capture>{props.title}</Capture>
      <Link href={props.url_private}>
        <Picture src={props.thumb_720} alt={props.title} />
      </Link>
    </Wrapper>
  );
}
