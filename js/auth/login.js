// js/auth/login.js
import { auth } from "../services/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('User logged in successfully!');
            // Check if the user has a verified phone number, if not, redirect to OTP verification
            if (!userCredential.user.phoneNumber) {
                window.location.href = 'otp-verification.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});