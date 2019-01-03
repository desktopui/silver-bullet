import * as React from "react";
import { useState } from "react";

function useLocalStorage(
  key: string
): [string | null, ((item: string) => void)] {
  const [item, setValue] = useState(() => window.localStorage.getItem(key));

  const setItem = (item: string) => {
    setValue(item);
    window.localStorage.setItem(key, item);
  };

  return [item, setItem];
}

import ChatLayout from "./ChatScreen";
import LoginScreen from "./LoginScreen";

function App() {
  const [token, setToken] = useLocalStorage("token");
  return token ? (
    <ChatLayout token={token} />
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
