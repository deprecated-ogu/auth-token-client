import React, { useState } from "react";

import Login from "./components/Login";
import MyPage from "./components/MyPage";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  

  const loginHandler = (data) => {
    if (data.data.accessToken)
      setLogin(true);
    issueAccessToken(data.data.accessToken);
  }

  const issueAccessToken = (token) => {
    setAccessToken(token);
  }

  return (
    <div className="App">
      {isLogin ? (
        <MyPage accessToken={accessToken} issueAccessToken={issueAccessToken}/>
        ) : (
        <Login loginHandler={loginHandler}/>
      )}
      
    </div>
  );
}

export default App;
