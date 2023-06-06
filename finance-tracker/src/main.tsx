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
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        background: "none",
        border: "2px solid #1f9751",
        padding: "6px 12px",
        borderRadius: "4px",
        color: "#1f9752",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1em",
      },
      _hover: {
        background: "#1f9752",
        color: "#fff",
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
