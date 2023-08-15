import { useState } from "react";
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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";

//components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import MonthPicker from "./MonthPicker";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  return (
    <Box p={2}>
      {isMobile && (
        <Flex w="100%" flexDir="column" gap={3}>
          <Flex justify="space-between">
            <MonthPicker />
            <Button
              onClick={() => setOpenModal(true)}
              colorScheme="whatsapp"
              size={{ base: "sm", sm: "md" }}
              w={{ base: "30%" }}
            >
              Add transaction
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
            {documents && <TransactionList transactions={documents} />}
          </Box>
        </Flex>
      )}
      {!isMobile && (
        <Flex flexDir="column">
          <MonthPicker />
          <Flex justify="space-evenly">
            <Box w={{ md: "60%", lg: "50%" }}>
              {error && <Text>{error}</Text>}
              {documents && <TransactionList transactions={documents} />}
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
