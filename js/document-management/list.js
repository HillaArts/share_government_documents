import { auth, db } from "../services/firebase.js";
import { query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { storage, db, auth } from "../services/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export const loadDocuments = async () => {
    const documentList = document.getElementById('document-list');
    documentList.innerHTML = ''; // Clear existing list

    const q = query(collection(db, "documents"), where("userId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const listItem = document.createElement('li');
        listItem.textContent = doc.data().fileName;

        // Custom event to handle update, delete, and share
        listItem.setAttribute('data-doc-id', doc.id);
        documentList.appendChild(listItem);
    });
};
