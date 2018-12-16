import * as React from "react";

import LoginScreen from "./LoginScreen";

class App extends React.Component {
  public render() {
    return <LoginScreen onAuthCompleted={code => console.log(code)} />;
  }
}

export default App;
