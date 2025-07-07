import useAuth from "@/Hooks/useAuth";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const { signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    const { email, password, name } = data;
    const file = data.photo[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const photoURL = res.data.data.display_url;
      signUp(email, password, name, photoURL);

      //    TODO   GIVE A DEFAULT ROLE WHEN LOGIN TO THE APP.
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("loged in with google.");
    loginWithGoogle();
    // navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "photo", label: "Profile Photo", type: "file" },
        ]}
        submitText="Sign Up"
        googleText="Sign up with Google"
        onSubmit={handleSignup}
        onGoogleLogin={handleGoogleLogin}
        linkText="Already have an account? Login"
        linkHref="/login"
      />
    </div>
  );
};

export default Signup;
