import { storage, db, auth } from "../services/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

export const uploadDocument = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `documents/${auth.currentUser.uid}/${file.name}`);
    
    try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "documents"), {
            userId: auth.currentUser.uid,
            fileName: file.name,
            fileUrl: url,
            uploadedAt: new Date(),
        });

        alert('Document uploaded successfully!');
    } catch (error) {
        alert(error.message);
    }
};
