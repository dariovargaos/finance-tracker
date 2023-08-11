import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";

const customTheme = extendTheme({
  styles: {
    global: {
      root: {
        margin: "0",
        fontSize: "1.1em",
        padding: "0",
        boxSizing: "border-box",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <ChakraProvider theme={customTheme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </AuthContextProvider>
);
