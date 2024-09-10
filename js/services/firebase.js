// js/services/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsacvCBAEFwIAgyHJWN866rpJYpCgrANs",
  authDomain: "share-government-documents.firebaseapp.com",
  projectId: "share-government-documents",
  storageBucket: "share-government-documents.appspot.com",
  messagingSenderId: "160968426342",
  appId: "1:160968426342:web:299cefc7c278ca72d6fea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };
