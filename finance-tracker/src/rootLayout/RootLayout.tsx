import { Link, Outlet } from "react-router-dom";
import { Box, List, ListItem, Spacer } from "@chakra-ui/react";
export default function RootLayout() {
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
        </List>
      </Box>

      <Outlet />
    </Box>
  );
}
