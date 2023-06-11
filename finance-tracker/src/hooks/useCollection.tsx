import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import {
  collection,
  onSnapshot,
  CollectionReference,
  QuerySnapshot,
  DocumentData,
  query,
  where,
  orderBy,
} from "firebase/firestore";

interface UseCollectionExports {
  documents: DocumentData[] | null;
  error: string | null;
}

export const useCollection = (collectionName: string): UseCollectionExports => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      collectionName
    );

    const q = query(
      collectionRef,
      where("uid", "==", user?.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: DocumentData[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (err: Error) => {
        console.log(err);
        setError("Could not fetch the data.");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, user?.uid]);

  return { documents, error };
};
