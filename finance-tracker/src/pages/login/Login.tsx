import { useState, FormEvent } from "react";
import { useLogin } from "../../hooks/useLogin";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

//icons
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
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
          <Heading mb="20px">Login</Heading>
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
                fontSize="1em"
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
                fontSize="1em"
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
          <FormControl isInvalid={error}>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          {!isPending && (
            <Button type="submit" colorScheme="whatsapp">
              Login
            </Button>
          )}
          {isPending && (
            <Button
              isLoading
              color="#1f9752"
              loadingText="Logging in..."
            ></Button>
          )}
        </form>
      </Box>
    </Flex>
  );
}
