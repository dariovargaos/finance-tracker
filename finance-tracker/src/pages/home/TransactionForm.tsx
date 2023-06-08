import { useState, FormEvent } from "react";
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

export default function TransactionForm() {
  const [transaction, setTransaction] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name: transaction,
      amount,
    });
  };
  return (
    <Box>
      <Card bg="#1f9751" size="lg">
        <CardHeader>
          <Heading size="lg" color="white">
            Add transaction
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="15px">
              <FormLabel color="white">Transaction name:</FormLabel>
              <Input
                type="text"
                required
                onChange={(e) => setTransaction(e.target.value)}
                value={transaction}
                bg="white"
              />
            </FormControl>
            <FormControl mb="15px">
              <FormLabel color="white">Amount ($):</FormLabel>
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
    </Box>
  );
}
