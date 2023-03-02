import React, { useState, useEffect } from "react";

interface AuthContextType {
  isLoggedInn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedInn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
});

type AuthContextProviderProps = {
  children?: React.ReactNode;
};

export const AuthContextProvider: React.FunctionComponent<AuthContextProviderProps> =
  function (props) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      const storedLoggedInUserInfo = localStorage.getItem("isLoggedIn");
      if (storedLoggedInUserInfo === "1") {
        setIsLoggedIn(true);
      }
    }, []);

    const loginHandler = (email: string, password: string) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
    };

    const logoutHandler = () => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    };

    return (
      <AuthContext.Provider
        value={{
          isLoggedInn: isLoggedIn,
          onLogout: logoutHandler,
          onLogin: loginHandler,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
