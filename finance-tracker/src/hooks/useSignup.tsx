import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log("User signed up:", res.user);

      if (!res) {
        throw new Error("Could not complete signup.");
      }

      //add display name to user
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      setIsPending(false);
      setError(null);

      //catch error if any
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
