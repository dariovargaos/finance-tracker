import { useEffect, useState, useReducer } from "react";
import { db, timestamp } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";

interface useFirestoreExports {
  addDocument: (doc: object) => void;
  deleteDocument: (id: string) => void;
  response: FirestoreState;
}
interface FirestoreState {
  document: DocumentReference | null;
  isPending: boolean;
  error: any;
  success: boolean | null;
}

type FirestoreAction =
  | { type: "IS_PENDING" }
  | { type: "ADDED_DOCUMENT"; payload: DocumentReference }
  | { type: "DELETED_DOCUMENT" }
  | { type: "ERROR"; payload: string };

const initialState: FirestoreState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (
  state: FirestoreState,
  action: FirestoreAction
): FirestoreState => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return { document: null, isPending: false, error: null, success: true };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName: string): useFirestoreExports => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCancelled] = useState<boolean>(false);

  // collection ref
  const collectionRef: CollectionReference = collection(db, collectionName);

  // only dispatch if isCancelled === false
  const dispatchIfNotCancelled = (action: FirestoreAction) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (_doc: object) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocumentRef = await addDoc(collectionRef, {
        ..._doc,
        createdAt: createdAt,
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocumentRef,
      });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await deleteDoc(doc(collectionRef, id));
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
