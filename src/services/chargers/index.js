import firebaseDb from "lib/firebaseDb";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const getAll = () =>
  getDocs(collection(firebaseDb, "chargers")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (ref) =>
  getDoc(doc(firebaseDb, "chargers", ref)).then((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));

export const add = ({ location }) =>
  addDoc(collection(firebaseDb, "chargers"), {
    location: location,
  });

export const update = (ref, { location }) =>
  updateDoc(doc(firebaseDb, "chargers", ref), {
    location: location,
  });

export const remove = (ref) => deleteDoc(doc(firebaseDb, "chargers", ref));
