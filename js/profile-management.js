// js/profile-management.js
import { auth, db } from "../services/firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Load User Profile
const loadUserProfile = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById('name').value = userData.name || '';
        document.getElementById('email').value = userData.email || auth.currentUser.email;
        document.getElementById('phone').value = userData.phone || '';
    } else {
        // If the document does not exist, initialize it with the user's email
        await setDoc(userDocRef, { email: auth.currentUser.email });
        document.getElementById('email').value = auth.currentUser.email;
    }
};

// Update User Profile
const updateUserProfile = async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    try {
        await setDoc(userDocRef, {
            name: name,
            phone: phone,
            email: auth.currentUser.email, // Keep email as a reference
        }, { merge: true });

        alert('Profile updated successfully!');
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
};

// Initialize the profile management
document.getElementById('profile-form').addEventListener('submit', updateUserProfile);

// Load profile on page load
window.onload = loadUserProfile;
