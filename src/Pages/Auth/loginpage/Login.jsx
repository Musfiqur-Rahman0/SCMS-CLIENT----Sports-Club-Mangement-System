import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import Lottie from "lottie-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
// import loginAni from "../../../../src/assets/Animations/User Profile.json";

const Login = () => {
  const { loginWithGoogle, login } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const res = await login(email, password);

    if (res.success) {
      navigate("/");
    }
    const userData = res?.result?.user;

    // posting user email to update last login date
    await axiosInstance.post("/users", { email: userData?.email });
  };

  return (
    <div className="w-full flex  flex-col gap-8 items-center justify-center ">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold ">Welcome Back Chief</h2>
        <p className="text-xs md:text-sm text-gray-500">
          Please login to Continue
        </p>
      </div>
      <div className="p-4 md:p-0 w-full">
        <AuthForm
          fields={[
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ]}
          submitText="Login"
          onSubmit={handleLogin}
          linkText="Don't have an account? Sign up"
          linkHref="/signup"
        />
      </div>
    </div>
  );
};
export default Login;
