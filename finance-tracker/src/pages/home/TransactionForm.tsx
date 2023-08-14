import { useState, useEffect, FormEvent } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import {
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Card,
  CardHeader,
  CardBody,
  CloseButton,
} from "@chakra-ui/react";

interface TransactionFormProps {
  uid?: string;
  closeModal: () => void;
}

export default function TransactionForm({
  uid,
  closeModal,
}: TransactionFormProps) {
  const [transactionName, setTransactionName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDocument({
      uid,
      transactionName,
      amount,
    });
  };

  useEffect(() => {
    if (response.success) {
      setTransactionName("");
      setAmount("");
      closeModal();
    }
  }, [response.success, closeModal]);

  return (
    <Card bg="whatsapp.600">
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="lg" color="white">
          Add transaction
        </Heading>
        <CloseButton onClick={closeModal} color="white" />
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <FormControl mb="15px">
            <FormLabel color="white">Transaction name:</FormLabel>
            <Input
              type="text"
              required
              onChange={(e) => setTransactionName(e.target.value)}
              value={transactionName}
              bg="white"
            />
          </FormControl>
          <FormControl mb="15px">
            <FormLabel color="white">Amount (€):</FormLabel>
            <Input
              type="number"
              required
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              bg="white"
            />
          </FormControl>
          <Button
            type="submit"
            color="white"
            variant="outline"
            _hover={{ bg: "transparent" }}
          >
            Add transaction
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
