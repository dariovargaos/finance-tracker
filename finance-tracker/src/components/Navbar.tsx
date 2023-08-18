import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Box,
  Button,
  List,
  ListItem,
  Spacer,
  Flex,
  Link,
} from "@chakra-ui/react";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <Box
      as="nav"
      bg="#effaf0"
      p="20px 10px"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <List display="flex" alignItems="center" gap={5}>
        <ListItem fontWeight="bold" fontSize="lg">
          My Money
        </ListItem>

        <Spacer />

        {!user && (
          <Flex gap={4}>
            <ListItem color="#333">
              <Link as={RouterLink} to="/login">
                Login
              </Link>
            </ListItem>
            <ListItem color="#333">
              <Link as={RouterLink} to="/signup">
                Signup
              </Link>
            </ListItem>
          </Flex>
        )}

        {user && (
          <>
            <ListItem>hello, {user.displayName}</ListItem>
            <ListItem color="#333">
              <Button onClick={logout} colorScheme="whatsapp">
                Logout
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
}
