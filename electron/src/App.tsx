import * as React from "react";
import useLocalStorage from "./useLocalStorage";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";

function App() {
  const [token, setToken] = useLocalStorage("token");
  return token ? (
    <ChatScreen token={token} />
  ) : (
    <LoginScreen
      onAuthError={message => alert(message)}
      onAuthCompleted={(code: string) => {
        setToken(code);
      }}
    />
  );
}

export default App;
