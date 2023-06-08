import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Flex, Spacer } from "@chakra-ui/react";

//components
import TransactionForm from "./TransactionForm";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <Flex maxW="960px" m="60px auto">
      <Box>Transaction list</Box>
      <Spacer />
      <Box>
        <TransactionForm uid={user?.uid} />
      </Box>
    </Flex>
  );
}
