import { useState, FormEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  Flex,
  Box,
  Input,
  FormControl,
  Button,
  FormHelperText,
  Heading,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [resetSucces, setResetSuccess] = useState<boolean>(false);
  const [resetError, setResetError] = useState<any>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email.trim() === "") {
        setResetSuccess(false);
        setResetError("Email is required.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
      setResetError(null);
      setEmail("");
    } catch (err: any) {
      setResetSuccess(false);
      setResetError("User not found.");
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
              placeholder="youremail@email.com"
            />
            <FormHelperText>
              We'll send a link to your email to create a new password.
            </FormHelperText>
            <FormErrorMessage>Email is required.</FormErrorMessage>
          </FormControl>
          {resetSucces && (
            <Text color="whatsapp.500" fontWeight="bold">
              Please check your inbox!
            </Text>
          )}
          {resetError && (
            <Text color="red" fontWeight="bold">
              {resetError}
            </Text>
          )}
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
