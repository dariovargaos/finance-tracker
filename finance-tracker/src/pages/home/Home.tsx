import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

//components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions");

  return (
    <Flex maxW="960px" m="60px auto">
      <Box>
        {error && <Text>{error}</Text>}
        {documents && <TransactionList transactions={documents} />}
      </Box>
      <Spacer />
      <Box>
        <TransactionForm uid={user?.uid} />
      </Box>
    </Flex>
  );
}
