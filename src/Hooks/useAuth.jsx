import { AuthContext } from "@/Context/AuthContext";
import { auth, googleProvider } from "@/firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import Swal from "sweetalert2";

const useAuth = () => {
  const { user } = useContext(AuthContext);

  const signUp = async (email, password, first_name, photoURL) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: first_name,
        photoURL: photoURL,
      });
      Swal.fire({
        title: "Registration successful!",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.message,
        icon: "error",
      });
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Login successful!",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.message,
        icon: "error",
      });
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      Swal.fire({
        title: "Login successful!",
        icon: "success",
      });
      return result;
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.message,
        icon: "error",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    signUp,
    login,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
