import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import Lottie from "lottie-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import loginAni from "../../../../src/assets/Animations/User Profile.json";

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
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen">
      <div className="p-4 md:p-0">
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
      <div className="hidden lg:block">
        <Lottie
          animationData={loginAni}
          style={{
            height: 500,
            width: 500,
          }}
        />
      </div>
    </div>
  );
};
export default Login;
