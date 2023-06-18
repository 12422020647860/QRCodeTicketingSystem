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
  getDocs(collection(firebaseDb, "stations"))
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )
    .then((stations) =>
      Promise.all(
        stations.map(
          (station) =>
            new Promise((resolve) => {
              Promise.all(station.lines.map((line) => getDoc(line)))
                .then((lines) =>
                  lines.map((line) => ({ id: line.id, ...line.data() }))
                )
                .then((lines) => resolve({ ...station, lines }));
            })
        )
      )
    )
    .then((stations) =>
      Promise.all(
        stations.map(
          (station) =>
            new Promise((resolve) => {
              Promise.all(station.stations.map((station) => getDoc(station)))
                .then((stations) =>
                  stations.map((station) => ({
                    id: station.id,
                    ...station.data(),
                  }))
                )
                .then((stations) => resolve({ ...station, stations }));
            })
        )
      )
    );

export const get = (ref) =>
  getDoc(doc(firebaseDb, "stations", ref))
    .then((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))
    .then(
      (station) =>
        new Promise((resolve) => {
          Promise.all(station.lines.map((line) => getDoc(line)))
            .then((lines) =>
              lines.map((line) => ({ id: line.id, ...line.data() }))
            )
            .then((lines) => resolve({ ...station, lines }));
        })
    )
    .then(
      (station) =>
        new Promise((resolve) => {
          Promise.all(station.stations.map((station) => getDoc(station)))
            .then((stations) =>
              stations.map((station) => ({ id: station.id, ...station.data() }))
            )
            .then((stations) => resolve({ ...station, stations }));
        })
    );

export const add = ({ name, lines, stations }) =>
  addDoc(collection(firebaseDb, "stations"), {
    name: name,
    lines: lines.map((line) => doc(firebaseDb, "lines", line)),
    stations: stations.map((station) => doc(firebaseDb, "stations", station)),
  });

export const update = (ref, { name, lines, stations }) =>
  updateDoc(doc(firebaseDb, "stations", ref), {
    name: name,
    lines: lines.map((line) => doc(firebaseDb, "lines", line)),
    stations: stations.map((station) => doc(firebaseDb, "stations", station)),
  });

export const remove = (ref) => deleteDoc(doc(firebaseDb, "stations", ref));
