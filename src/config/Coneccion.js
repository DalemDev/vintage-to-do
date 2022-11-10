import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCD1lGPhZRt3AcOdgD8iK-uk5j7IwHgSDo",
  authDomain: "to-do-app-55f1b.firebaseapp.com",
  projectId: "to-do-app-55f1b",
  storageBucket: "to-do-app-55f1b.appspot.com",
  messagingSenderId: "5207450095",
  appId: "1:5207450095:web:f293092d537be699e5961a"
};

const app = initializeApp(firebaseConfig);

export default app;