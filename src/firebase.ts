import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  useDeviceLanguage,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

export const recaptchaKey = "6LdEc3MhAAAAABN7usunbyF5cdMLAfK0Y5S6QPfe";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmpAwDlEaThA7N-V9z9KF4YQ-wo_UhtXM",
  authDomain: "sahla-365a8.firebaseapp.com",
  projectId: "sahla-365a8",
  storageBucket: "sahla-365a8.appspot.com",
  messagingSenderId: "509280204329",
  appId: "1:509280204329:web:b3c4a05b392dd76c46ce38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function initCaptchaVerifier(buttonId: string) {
  return new Promise((resolve) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      buttonId,
      {
        size: "invisible",
        callback: (response: any) => {
          console.log(response);
          resolve(response);
        },
      },
      auth
    );
    (window as any).recaptchaVerifier = recaptchaVerifier;
  });
}

export const auth = getAuth(app);

useDeviceLanguage(auth);

export function signWithPhone(phone: string) {
  return signInWithPhoneNumber(
    auth,
    phone,
    (window as any).recaptchaVerifier
  ).then((confirmation) => {
    return (code: string) => confirmation.confirm(code);
  });
}

export function subscribeToUser(fc: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    fc(user);
  });
}

