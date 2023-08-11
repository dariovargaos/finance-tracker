import { useState, FormEvent } from "react";
import { useSignup } from "../../hooks/useSignup";
import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

//icons
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex justify="center">
      <Box
        w={{ base: "90%", sm: "50%", md: "40%", lg: "30%" }}
        border="1px solid #ddd"
        boxShadow="base"
        p="20px"
      >
        <form onSubmit={handleSubmit}>
          <Heading mb="20px">Signup</Heading>
          <FormControl mb="20px">
            <FormLabel>email:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                color="#777"
              />
            </InputGroup>
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>password:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                color="#777"
              />
              <InputRightElement>
                <Button
                  colorScheme="whatsapp"
                  variant="ghost"
                  onClick={handleClick}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>display name:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <AtSignIcon />
              </InputLeftElement>
              <Input
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                color="#777"
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={error}>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          {isPending && <Button isLoading loadingText="Signing up..."></Button>}
          {!isPending && (
            <Button type="submit" colorScheme="whatsapp">
              Signup
            </Button>
          )}
        </form>
      </Box>
    </Flex>
  );
}
