import * as React from "react";
import useLocalStorage from "./useLocalStorage";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";
import { sendEventToMain } from "./electron";

function App() {
  const [token, setToken] = useLocalStorage("token");
  if (token) {
    interceptImageRequests(token);
  }
  return token ? (
    <ChatScreen token={token} />
  ) : (
    <LoginScreen
      onAuthError={message => alert(message)}
      onAuthCompleted={(token: string) => {
        setToken(token);
        interceptImageRequests(token);
      }}
    />
  );
}

function interceptImageRequests(token: string) {
  sendEventToMain("set-auth-header", token);
}

export default App;
