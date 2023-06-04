import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

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

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    //sing the user out
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      //dispatch logout action
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

  return { login, error, isPending };
};
