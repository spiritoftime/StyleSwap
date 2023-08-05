// for all firebase uploads, query and delete
// realtime database
import {
  getDatabase,
  ref as dbRef,
  child,
  remove,
  get,
} from "firebase/database";
const DB = getDatabase();

export const deleteFirebaseRecords = (ref: string) => {
  const firebaseRef = dbRef(DB, ref);
  return remove(firebaseRef);
};
