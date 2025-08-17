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
      const result = await signUp(email, password, name, photoURL);
      if (result.success) {
        navigate("/login");
      }

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
    <div className="w-full flex flex-col gap-8 items-center justify-center ">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Welcome Aboard!</h2>
        <p className="text-sm text-gray-500">
          Sign up in seconds and start your journey with us.
        </p>
      </div>
      <div className="p-4 md:p-0">
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
    </div>
  );
};

export default Signup;
