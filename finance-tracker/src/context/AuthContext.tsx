import React, { createContext, useReducer, ReactNode } from "react";

interface User {
  email: string;
  password: string;
  displayName?: string;
}
interface AuthState {
  user: any;
}

interface AuthAction {
  type: string;
  payload?: User;
}

export interface AuthContextType {
  user: {
    displayName: string;
  } | null;
  dispatch: React.Dispatch<AuthAction>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const contextValue: AuthContextType = {
    user: state.user,
    dispatch,
  };

  console.log("AuthContext state:", state);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
