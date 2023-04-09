import app from "../config/Coneccion";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const iniciarSesion = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registrarse = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const iniciarSesionGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const cerrarSesion = () => {        
    signOut(auth);
  };

  const restaurarPassword = (email) => sendPasswordResetEmail(auth, email);

  const obtenerPostItFireStore = async () => {
    const postItRef = collection(db, 'postit');
    const q = query(postItRef, where('autor', '==', auth.currentUser.email)); 
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  const guardarPostItFireStore = async (postit) => {
    try {
      await addDoc(collection(db, "postit"), {
        titulo: postit.titulo,
        nota: postit.nota,
        autor: postit.autor
      });

      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        iniciarSesion,
        registrarse,
        iniciarSesionGoogle,
        cerrarSesion,
        restaurarPassword,
        guardarPostItFireStore,
        obtenerPostItFireStore,
        user,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
