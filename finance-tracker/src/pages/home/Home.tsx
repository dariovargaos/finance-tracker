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
    <Flex
      justify={{
        base: "flex-end",
        sm: "center",
        md: "space-around",
        lg: "space-around",
      }}
      flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}
      gap={10}
      p={2}
    >
      {isMobile && (
        <Flex justify="flex-end">
          <Button
            onClick={() => setOpenModal(true)}
            colorScheme="whatsapp"
            size={{ base: "sm", sm: "md" }}
            w={{ base: "30%" }}
          >
            Add transaction
          </Button>
          <Modal isOpen={openModal} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent w={{ base: "90%", sm: "60%" }}>
              <TransactionForm uid={user?.uid} closeModal={closeModal} />
            </ModalContent>
          </Modal>
        </Flex>
      )}
      <Box w={{ base: "100%", sm: "95%", md: "60%", lg: "40%" }}>
        {error && <Text>{error}</Text>}
        {documents && <TransactionList transactions={documents} />}
      </Box>
      {!isMobile && (
        <Box>
          <TransactionForm uid={user?.uid} closeModal={closeModal} />
        </Box>
      )}
    </Flex>
  );
}
