import { db } from "../services/firebase.js";
import { doc, updateDoc, query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

export const shareDocument = async (docId, shareEmail) => {
    const userQuery = query(collection(db, "users"), where("email", "==", shareEmail));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
        alert("User not found.");
        return;
    }

    const sharedUserId = userSnapshot.docs[0].id;
    const documentRef = doc(db, "documents", docId);

    try {
        await updateDoc(documentRef, {
            sharedWith: sharedUserId,
        });
        alert('Document shared successfully!');
    } catch (error) {
        alert(error.message);
    }
};
