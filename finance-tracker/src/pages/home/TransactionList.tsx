import { List, ListItem, Text, Spacer, CloseButton } from "@chakra-ui/react";
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
          display="flex"
          boxShadow="base"
          borderLeft="4px solid #1f9751"
          alignItems="center"
          wordBreak="break-word"
        >
          <Text color="#777" fontSize="xl">
            {transaction.transactionName}
          </Text>
          <Spacer />
          <Text color="#777" fontWeight="bold" fontSize="2xl">
            €{transaction.amount}
          </Text>
          <CloseButton
            onClick={() => deleteDocument(transaction.id)}
            color="#777"
          />
        </ListItem>
      ))}
    </List>
  );
}
