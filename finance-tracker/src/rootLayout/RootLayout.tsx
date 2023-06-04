import { Link, Outlet } from "react-router-dom";
import { Box, Button, List, ListItem, Spacer } from "@chakra-ui/react";
import { useLogout } from "../hooks/useLogout";
export default function RootLayout() {
  const { logout } = useLogout();
  return (
    <Box>
      <Box as="nav" w="100%" bg="#effaf0" p="20px 10px" boxSizing="border-box">
        <List display="flex" m="0 auto" maxW="960px" alignItems="center">
          <ListItem fontWeight="bold" fontSize="1.2em">
            My Money
          </ListItem>

          <Spacer />

          <ListItem ml="16px" color="#333">
            <Link to="/login">Login</Link>
          </ListItem>
          <ListItem ml="16px" color="#333">
            <Link to="/signup">Signup</Link>
          </ListItem>
          <ListItem ml="16px" color="#333">
            <Button onClick={logout}>Logout</Button>
          </ListItem>
        </List>
      </Box>

      <Outlet />
    </Box>
  );
}
