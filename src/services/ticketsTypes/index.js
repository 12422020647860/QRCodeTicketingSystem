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
  getDocs(collection(firebaseDb, "tickets-types")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (ref) =>
  getDoc(doc(firebaseDb, "tickets-types", ref)).then((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));

export const add = ({ name, price, stations }) =>
  addDoc(collection(firebaseDb, "tickets-types"), {
    name: name,
    price: price,
    stations: stations,
  });

export const update = (ref, { name, price, stations }) =>
  updateDoc(doc(firebaseDb, "tickets-types", ref), {
    name: name,
    price: price,
    stations: stations,
  });

export const remove = (ref) => deleteDoc(doc(firebaseDb, "tickets-types", ref));
