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
  getDocs(collection(firebaseDb, "lines")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (ref) =>
  getDoc(doc(firebaseDb, "lines", ref)).then((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));

export const add = ({ name }) =>
  addDoc(collection(firebaseDb, "lines"), {
    name: name,
  });

export const update = (ref, { name }) =>
  updateDoc(doc(firebaseDb, "lines", ref), {
    name: name,
  });

export const remove = (ref) => deleteDoc(doc(firebaseDb, "lines", ref));
