import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext, { AuthContextProvider } from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedInn && <Login />}
        {authCtx.isLoggedInn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
