import { useState, FormEvent } from "react";
import { useSignup } from "../../hooks/useSignup";
import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form
      onSubmit={handleSubmit as any}
      style={{
        maxWidth: "360px",
        margin: "60px auto",
        padding: "20px",
        boxShadow: "3px 3px 5px rgba(0,0,0, 0.05)",
        border: "1px solid #ddd",
      }}
    >
      <Heading mb="20px">Signup</Heading>
      <FormControl mb="20px">
        <FormLabel>email:</FormLabel>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fontSize="1em"
          color="#777"
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>password:</FormLabel>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          fontSize="1em"
          color="#777"
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>display name:</FormLabel>
        <Input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          fontSize="1em"
          color="#777"
        />
      </FormControl>
      <FormControl isInvalid={error}>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>

      {isPending && <Button isLoading loadingText="Signing up..."></Button>}
      {!isPending && (
        <Button type="submit" color="#1f9752">
          Signup
        </Button>
      )}
    </form>
  );
}
