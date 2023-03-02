import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

type NavigationProps = {
  // isLoggedIn: boolean;
  // onLogout: () => void;
};

const Navigation: React.FunctionComponent<NavigationProps> = function (props) {
  const authCtx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedInn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authCtx.isLoggedInn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authCtx.isLoggedInn && (
          <li>
            <button onClick={authCtx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
