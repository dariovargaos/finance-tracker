import { Box, Flex, Spacer } from "@chakra-ui/react";

//components
import TransactionForm from "./TransactionForm";

export default function Home() {
  return (
    <Flex maxW="960px" m="60px auto">
      <Box>Transaction list</Box>
      <Spacer />
      <Box>
        <TransactionForm />
      </Box>
    </Flex>
  );
}
