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
  getDocs(collection(firebaseDb, "terminals"))
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )
    .then((terminals) =>
      Promise.all(
        terminals.map(
          (terminal) =>
            new Promise((resolve) => {
              getDoc(terminal.station)
                .then((station) => ({ id: station.id, ...station.data() }))
                .then((station) => resolve({ ...terminal, station }));
            })
        )
      )
    );

export const get = (ref) =>
  getDoc(doc(firebaseDb, "terminals", ref))
    .then((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))
    .then(
      (terminal) =>
        new Promise((resolve) => {
          getDoc(terminal.station)
            .then((station) => ({ id: station.id, ...station.data() }))
            .then((station) => resolve({ ...terminal, station }));
        })
    );

export const add = ({ type, station }) =>
  addDoc(collection(firebaseDb, "terminals"), {
    type: type,
    station: doc(firebaseDb, "stations", station),
  });

export const update = (ref, { type, station }) =>
  updateDoc(doc(firebaseDb, "terminals", ref), {
    type: type,
    station: doc(firebaseDb, "stations", station),
  });

export const remove = (ref) => deleteDoc(doc(firebaseDb, "terminals", ref));
