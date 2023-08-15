import {
  List,
  ListItem,
  Text,
  Spacer,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useFirestore } from "../../hooks/useFirestore";

interface TransactionListProps {
  transactions: DocumentData[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <List display="flex" flexDir="column" gap={12}>
      {transactions.map((transaction) => (
        <ListItem
          key={transaction.id}
          p="20px"
          boxShadow="base"
          borderLeft="4px solid #1f9751"
        >
          <Flex wordBreak="break-word" align="center">
            <Text color="gray.600" fontSize="xl">
              {transaction.transactionName}
            </Text>
            <Spacer />
            <Text color="gray.600" fontWeight="bold" fontSize="2xl">
              €{transaction.amount}
            </Text>
            <CloseButton
              onClick={() => deleteDocument(transaction.id)}
              color="#777"
            />
          </Flex>
          <Text color="lightgray">
            {transaction.createdAt.toDate().toDateString()}
          </Text>
        </ListItem>
      ))}
    </List>
  );
}
