import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

interface SignupExports {
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  error: any;
  isPending: boolean;
}

export const useSignup = (): SignupExports => {
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const toast = useToast();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

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

      if (password.length < 6) {
        setIsPending(false);
        setError("Password should be at least 6 characters.");
        return;
      }

      if (displayName.trim() === "") {
        setIsPending(false);
        setError("Display name cannot be empty.");
        return;
      }
      //signup user
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup.");
      }

      //add display name to user
      await updateProfile(res.user, {
        displayName: displayName,
      });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      toast({
        title: "Successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err);
        if (
          err.message.includes("Firebase: Error (auth/email-already-in-use).")
        ) {
          setError(
            "This email address is already in use. Please choose another email."
          );
        } else if (
          err.message.includes("Firebase: Error (auth/invalid-email).")
        ) {
          setError("Invalid email.");
        } else if (
          err.message.includes("Firebase: Error (auth/missing-password).")
        ) {
          setError("You must enter a password.");
        } else if (
          err.message.includes(
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          )
        ) {
          setError("Password should be at least 6 characters.");
        } else {
          setError(err.message);
        }
        setIsPending(false);
        return;
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
