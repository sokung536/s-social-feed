"use client";

import { createContext, useContext } from "react";

type UserContextType = {
  username: string;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserContext.Provider");
  }
  return context;
};
