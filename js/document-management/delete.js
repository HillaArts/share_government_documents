import { storage, db } from "../services/firebase.js";
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

export const deleteDocument = async (docId, fileName) => {
    const confirmDelete = confirm("Are you sure you want to delete this document?");
    if (!confirmDelete) return;

    const documentRef = doc(db, "documents", docId);

    try {
        // Delete from storage
        const storageRef = ref(storage, `documents/${fileName}`);
        await deleteObject(storageRef);

        // Delete from Firestore
        await deleteDoc(documentRef);

        alert('Document deleted successfully!');
    } catch (error) {
        alert(error.message);
    }
};
