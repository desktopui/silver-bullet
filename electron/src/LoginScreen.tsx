import { shell } from "electron";
import * as React from "react";
import * as Oauth2 from "simple-oauth2";
import styled from "styled-components";

// const Input = styled.input`
//   font-size: 1.4em;
//   margin: 0.2em;
// `;

// const Submit = styled.button`
//   font-size: 1.4em;
// `;

const Block = styled.div`
  margin-top: 2em;
  flex: auto;
`;

// const Form = styled.div`
//   margin: 2em;
// `;

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

// Authorization oauth2 URI
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: "http://localhost:3000/callback",
  scope: "<scope>", // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  state: "<state>"
});

export default class LoginScreen extends React.Component {
  public render() {
    return (
      <Block>
        <LinkButton
          href={authorizationUri}
          target="_blank"
          onClick={e => {
            console.log(e);
            shell.openExternal("https://github.com");
          }}
        >
          Sign in with Slack
        </LinkButton>
      </Block>
    );
  }
}
