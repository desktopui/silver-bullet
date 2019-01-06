// import { shell } from "electron";
import * as React from "react";
import * as Oauth2 from "simple-oauth2";
import styled from "styled-components";
import parse from "url-parse";
import Link from "./Link";
import { electron } from "./electron";

const Block = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const credentials = {
  auth: {
    tokenHost: "https://slack.com/oauth/"
  },
  client: {
    id: process.env.REACT_APP_SLACK_CLIENT_ID,
    secret: process.env.REACT_APP_SLACK_CLIENT_SECRET
  }
};
const oauth2 = Oauth2.create(credentials);

const REDIRECT_URI = "sbelectron://app/callback";
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: REDIRECT_URI,
  scope: [
    "channels:read",
    "channels:history",
    "groups:read",
    "im:read",
    "mpim:read",
    "team:read"
  ],
  state: "uniquestring"
});

interface Props {
  onAuthCompleted(code: string): void;
  onAuthError(message: string): void;
}

const LinkButton = styled(Link)`
  font-size: 1.5em;
  color: palevioletred;
`;

export default class LoginScreen extends React.Component<Props> {
  componentDidMount() {
    const { ipcRenderer } = electron;

    // We could type it better, getting rid of string literals
    ipcRenderer.on("oauth-callback", (event: any, url: string) => {
      // using the power of the npm ecosystem
      const u = parse(url, "parse", true);
      if (u.query.code) {
        const formData = new URLSearchParams();
        formData.append("code", u.query.code);
        formData.append("client_id", process.env
          .REACT_APP_SLACK_CLIENT_ID as string);
        formData.append("client_secret", process.env
          .REACT_APP_SLACK_CLIENT_SECRET as string);
        formData.append("redirect_uri", REDIRECT_URI);
        return fetch(`https://slack.com/api/oauth.access`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            if (res.access_token) {
              this.props.onAuthCompleted(res.access_token);
            } else {
              this.props.onAuthError("No access token presented in response");
            }
          });
      } else {
        this.props.onAuthError("No code presented in url");
      }
    });
  }
  public render() {
    return (
      <Block>
        <div>
          <h1>Silver Bullet / Electron</h1>
        </div>
        <div>
          <LinkButton href={authorizationUri}>Sign in with Slack</LinkButton>
        </div>
      </Block>
    );
  }
}
