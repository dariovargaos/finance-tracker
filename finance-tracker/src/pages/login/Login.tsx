import { useState, FormEvent } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(email, password);
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
      <Heading mb="20px">Login</Heading>
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
      <Button type="submit" color="#1f9752">
        Login
      </Button>
    </form>
  );
}
