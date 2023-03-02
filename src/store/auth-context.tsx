import React from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  onLogout: () => {},
});

export default AuthContext;
