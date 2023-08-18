import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
} from "@chakra-ui/react";

//components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import MonthPicker from "./MonthPicker";
import TransactionsSum from "./TransactionsSum";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(() => {
    return localStorage.getItem("selectedFilter");
  });

  const closeModal = () => {
    setOpenModal(false);
  };

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    if (currentFilter !== null) {
      localStorage.setItem("selectedFilter", currentFilter);
    }
  }, [currentFilter]);

  const filteredTransactions = documents
    ? documents.filter((document) => {
        const createdAt = document.createdAt.toDate();
        const createdAtMonth = createdAt.toLocaleString("en-US", {
          month: "long",
        });
        return currentFilter === createdAtMonth;
      })
    : [];

  const isSmallScreen: boolean | undefined = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  return (
    <Box p={2}>
      {isSmallScreen && (
        <Flex w="100%" flexDir="column" gap={6}>
          <Flex justify="space-between" align="center">
            <MonthPicker
              changeFilter={changeFilter}
              currentFilter={currentFilter}
            />
            <TransactionsSum transactions={filteredTransactions} />
            <Button
              onClick={() => setOpenModal(true)}
              colorScheme="whatsapp"
              size={{ base: "sm", sm: "md" }}
              w={{ base: "20%" }}
            >
              Add +
            </Button>
          </Flex>
          <Modal isOpen={openModal} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent w={{ base: "90%", sm: "60%" }}>
              <TransactionForm uid={user?.uid} closeModal={closeModal} />
            </ModalContent>
          </Modal>
          <Box w={{ base: "100%", sm: "95%" }}>
            {error && <Text>{error}</Text>}
            {filteredTransactions.length > 0 ? (
              <TransactionList transactions={filteredTransactions} />
            ) : (
              <Text>No transactions were made this month!</Text>
            )}
          </Box>
        </Flex>
      )}
      {!isSmallScreen && (
        <Flex flexDir="column" gap={10}>
          <MonthPicker
            changeFilter={changeFilter}
            currentFilter={currentFilter}
          />
          <Flex justify="center">
            <TransactionsSum transactions={filteredTransactions} />
          </Flex>
          <Flex justify="space-evenly">
            <Box w={{ md: "60%", lg: "50%" }}>
              {error && <Text>{error}</Text>}
              {filteredTransactions.length > 0 ? (
                <TransactionList transactions={filteredTransactions} />
              ) : (
                <Text>No transactions were made this month!</Text>
              )}
            </Box>
            <Box>
              <TransactionForm uid={user?.uid} closeModal={closeModal} />
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
