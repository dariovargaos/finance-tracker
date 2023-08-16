import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  Flex,
  Box,
  Input,
  FormControl,
  Button,
  useToast,
  FormHelperText,
  Heading,
} from "@chakra-ui/react";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [resetSucces, setResetSuccess] = useState<boolean>(false);
  const [resetError, setResetError] = useState<any>(null);

  const navigate: NavigateFunction = useNavigate();
  const toast = useToast();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
      setResetError(null);
      toast({
        title: "Please check your email.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
    } catch (err: any) {
      setResetSuccess(false);
      setResetError(err.message);
      toast({
        title: "Please check if you entered correct email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex justifyContent="center" maxH="100vh">
      <Box w={["90%", "50%", "40%", "30%"]} bg="#fff" p="30px" boxShadow="base">
        <form
          onSubmit={handleResetPassword}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Heading size="md">Recover your password</Heading>
          <FormControl>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="youremail@email.com"
            />
            <FormHelperText>
              We'll send a link to your email to create a new password.
            </FormHelperText>
          </FormControl>
          <Button type="submit" colorScheme="whatsapp" size="sm">
            Send link
          </Button>
          <Button
            w="40%"
            size="sm"
            colorScheme="whatsapp"
            onClick={() => navigate("/login")}
          >
            Go back
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
