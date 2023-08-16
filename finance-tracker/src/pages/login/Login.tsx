import { useState, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
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
                color="gray.500"
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
                color="gray.500"
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
          {error && (
            <Text fontWeight="bold" color="red">
              {error}
            </Text>
          )}
          {!isPending && (
            <Button type="submit" colorScheme="whatsapp">
              Login
            </Button>
          )}
          {isPending && (
            <Button
              isLoading
              colorScheme="whatsapp"
              loadingText="Logging in..."
            ></Button>
          )}
        </form>
        <Link as={RouterLink} to="/resetpassword" color="whatsapp.500">
          Forgot password?
        </Link>
      </Box>
    </Flex>
  );
}
