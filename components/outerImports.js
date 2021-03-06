import { getAuth } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import {
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

export const auth = getAuth();
export const db = getFirestore();
export const questionData = collection(db, "questionData");
export const userData = collection(db, "userData");