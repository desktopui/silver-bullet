// import { shell } from "electron";
import * as React from "react";
import * as Oauth2 from "simple-oauth2";
import styled from "styled-components";
import parse from "url-parse";

const Block = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LinkButton = styled.a`
  font-size: 1.4em;
  color: palevioletred;
`;

const credentials = {
  auth: {
    tokenHost: "https://slack.com/oauth/"
  },
  client: {
    id: "416704546549.415846697872",
    secret: "<client-secret>"
  }
};
const oauth2 = Oauth2.create(credentials);

/*
channels:history
Access information about user’s public channels

channels:read
WORKSPACE INFO	
Access information about your workspace

team:read
*/
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: "sbelectron://app/callback",
  scope: ["channels:read", "channels:history", "team:read"], // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  state: "1"
});

const electron = (window as any).require("electron");

interface Props {
  onAuthCompleted(code?: string): void;
}

export default class LoginScreen extends React.Component<Props> {
  componentDidMount() {
    const { ipcRenderer } = electron;

    // We could type it better, getting rid of string literals
    ipcRenderer.on("oauth-callback", (event: any, url: string) => {
      // using the power of the npm ecosystem
      const u = parse(url, "parse", true);
      this.props.onAuthCompleted(u.query.code);
    });
  }
  public render() {
    return (
      <Block>
        <LinkButton
          href={authorizationUri}
          target="_blank"
          onClick={e => {
            e.preventDefault();
            const link = (e.target as any).href;
            electron.shell.openExternal(link);
          }}
        >
          Sign in with Slack
        </LinkButton>
      </Block>
    );
  }
}
