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
    <List spacing="40px">
      {transactions.map((transaction) => (
        <ListItem
          key={transaction.id}
          p="20px"
          display="flex"
          border="1px solid #f2f2f2"
          boxShadow="3px 3px 5px rgba(50,50,50,0.1)"
          borderLeft="4px solid #1f9751"
          alignItems="center"
          minW="450px"
        >
          <Text color="#777" fontSize="1.3em">
            {transaction.transactionName}
          </Text>
          <Spacer />
          <Text color="#777" fontWeight="bold" fontSize="1.6em">
            €{transaction.amount}
          </Text>
          <CloseButton
            onClick={() => deleteDocument(transaction.id)}
            color="#777"
            mb="auto"
            mt="-20px"
            mr="-20px"
          />
        </ListItem>
      ))}
    </List>
  );
}
