import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBU7v6JwRUxk3v0LIUHenJNlVs-XLIQcO4",
  authDomain: "bookstore-auth-e6e81.firebaseapp.com",
  projectId: "bookstore-auth-e6e81",
  storageBucket: "bookstore-auth-e6e81.firebasestorage.app",
  messagingSenderId: "853545760440",
  appId: "1:853545760440:web:d6d609a440aba484d6a64d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);