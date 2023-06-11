import { List, ListItem, Text, Spacer } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";

interface TransactionListProps {
  transactions: DocumentData[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
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
        </ListItem>
      ))}
    </List>
  );
}
