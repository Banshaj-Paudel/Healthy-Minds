import React from "react";

export interface IUserContext {
  username: string;
  setUsername(username: string): void;
}

export const UserContext = React.createContext({
  username: "",
  setUsername: (_username: string) => {},
});
const UserProvider = ({ children }: any) => {
  const currUsername = localStorage.getItem("username") || "";

  const [username, setUsername] = React.useState(currUsername);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
