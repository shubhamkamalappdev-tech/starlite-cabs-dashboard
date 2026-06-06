import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

export async function addDriver(
  data
) {
  await addDoc(
    collection(db, "drivers"),
    data
  );
}

export async function getDrivers() {
  const snap = await getDocs(
    collection(db, "drivers")
  );

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addVehicle(
  data
) {
  await addDoc(
    collection(db, "vehicles"),
    data
  );
}

export async function getVehicles() {
  const snap = await getDocs(
    collection(db, "vehicles")
  );

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addLog(
  data
) {
  await addDoc(
    collection(db, "logs"),
    data
  );
}

export async function getLogs() {
  const snap = await getDocs(
    collection(db, "logs")
  );

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function deleteLog(
  id
) {
  await deleteDoc(
    doc(db, "logs", id)
  );
}

export async function updateLog(
  id,
  data
) {
  await updateDoc(
    doc(db, "logs", id),
    data
  );
}
export async function updateDriver(
  id,
  data
) {
  await updateDoc(
    doc(db, "drivers", id),
    data
  );
}

export async function deleteVehicle(
  id
) {
  await deleteDoc(
    doc(db, "vehicles", id)
  );
}

export async function updateVehicle(
  id,
  data
) {
  await updateDoc(
    doc(db, "vehicles", id),
    data
  );
}
export async function deleteDriver(
  id
) {
  await deleteDoc(
    doc(db, "drivers", id)
  );
}
export async function addRentalLog(
  data
) {
  await addDoc(
    collection(
      db,
      "rentalLogs"
    ),
    data
  );
}

export async function getRentalLogs() {
  const snap =
    await getDocs(
      collection(
        db,
        "rentalLogs"
      )
    );

  return snap.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data()
    })
  );
}

export async function deleteRentalLog(
  id
) {
  await deleteDoc(
    doc(
      db,
      "rentalLogs",
      id
    )
  );
}

export async function updateRentalLog(
  id,
  data
) {
  await updateDoc(
    doc(
      db,
      "rentalLogs",
      id
    ),
    data
  );
}