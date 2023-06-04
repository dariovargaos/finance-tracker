import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

interface LogoutExports {
  logout: () => Promise<void>;
  error: any;
  isPending: boolean;
}

export const useLogout = (): LogoutExports => {
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sing the user out
    try {
      await signOut(auth);

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
};
