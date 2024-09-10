import { auth } from "../services/firebase.js";
import { signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

let confirmationResult;

// Initialize reCAPTCHA
const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow user to send OTP
            document.getElementById('phone-form').style.display = 'block';
        },
        'expired-callback': () => {
            // Reset reCAPTCHA on expiration
            window.recaptchaVerifier.reset();
        }
    }, auth);
};

// Send OTP
document.getElementById('phone-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;

    // Set up reCAPTCHA and send OTP
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
            confirmationResult = result;
            alert('OTP sent to your phone number.');
            document.getElementById('otp-form').style.display = 'block';
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Verify OTP
document.getElementById('otp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const otpCode = document.getElementById('otp-code').value;

    confirmationResult.confirm(otpCode)
        .then((result) => {
            alert('Phone number verified successfully!');
            // Redirect to the dashboard or next step in the process
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Invalid OTP. Please try again.');
        });
});
