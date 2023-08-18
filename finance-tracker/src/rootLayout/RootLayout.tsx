import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <Flex flexDir="column" gap={6} minH="100vh" bg="gray.50">
      <Navbar />

      <Outlet />
    </Flex>
  );
}
