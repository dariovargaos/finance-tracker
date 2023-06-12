import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

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

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
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
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
