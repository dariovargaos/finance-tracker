import { useState, useEffect } from "react";
import { Text, Progress } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";

interface TransactionsSumProps {
  transactions: DocumentData[] | null;
}

export default function TransactionsSum({
  transactions,
}: TransactionsSumProps) {
  const [sum, setSum] = useState<number>(0);

  const calculateSum = () => {
    if (transactions) {
      let total = 0;
      for (let i = 0; i < transactions.length; i++) {
        total += parseFloat(transactions[i].amount);
      }
      setSum(total);
    }
  };

  useEffect(() => {
    calculateSum();
  });

  return (
    <Text
      fontWeight="bold"
      fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
    >
      Sum: €{sum.toFixed(2)}
    </Text>
  );
}
