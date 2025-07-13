import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import signupAni from "../../../../src/assets/Animations/User Profile.json";
import Lottie from "lottie-react";

const Signup = () => {
  const { signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosIntence = useAxios();

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

      const newUser = {
        name,
        email,
        photoURL,
        last_loged_in: new Date().toISOString(),
      };
      await axiosIntence.post("/users", newUser);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <Lottie
          animationData={signupAni}
          style={{
            height: 500,
            width: 500,
          }}
        />
      </div>
      <AuthForm
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "photo", label: "Profile Photo", type: "file" },
        ]}
        submitText="Sign Up"
        onSubmit={handleSignup}
        linkText="Already have an account? Login"
        linkHref="/login"
      />
    </div>
  );
};

export default Signup;
