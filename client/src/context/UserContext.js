import React, { createContext, useReducer } from "react";
import UserReducer from "../reducer/UserReducer";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [User, Dispatch] = useReducer(UserReducer, {
    token: "",
    user: "",
  });
  return (
    <UserContext.Provider value={[User, Dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
