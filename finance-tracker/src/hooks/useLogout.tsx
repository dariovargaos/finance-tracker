import { useState } from "react";
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

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sing the user out
    try {
      await signOut(auth);

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
