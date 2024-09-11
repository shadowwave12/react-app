import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCW8fvcZbIOkKGooSy-iSKF6XauWkATzwU",
  authDomain: "registration-form-5b01e.firebaseapp.com",
  projectId: "registration-form-5b01e",
  storageBucket: "registration-form-5b01e.appspot.com",
  messagingSenderId: "364384367095",
  appId: "1:364384367095:web:d3649ba10d64040d04bef2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
