import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

interface LoginExports {
  login: (email: string, password: string) => Promise<void>;
  error: any;
  isPending: boolean;
}

export const useLogin = (): LoginExports => {
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const toast = useToast();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    //sing the user in
    try {
      if (email.trim() === "") {
        setIsPending(false);
        setError("Email is required.");
        return;
      }

      if (password.trim() === "") {
        setIsPending(false);
        setError("Password is required.");
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, password);

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      toast({
        title: "Logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err);
        if (
          err.message.includes("Firebase: Error (auth/user-not-found).") ||
          err.message.includes("Firebase: Error (auth/wrong-password).") ||
          err.message.includes("Firebase: Error (auth/invalid-email).")
        ) {
          setError("Incorrect email or password.");
        } else {
          setError(err.message);
        }
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
