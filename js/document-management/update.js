import { db } from "../services/firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

export const updateDocument = async (docId, newFileName) => {
    const documentRef = doc(db, "documents", docId);
    
    try {
        await updateDoc(documentRef, {
            fileName: newFileName,
        });
        alert('Document updated successfully!');
    } catch (error) {
        alert(error.message);
    }
};
