import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import React from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginWithGoogle, login } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const res = await login(email, password);
    const userData = res.user;

    // TODO: Call your login API here
    await axiosInstance.post("/users", { email: userData.email });
  };

  return (
    <div className="flex items-center justify-center h-screen">
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
  );
};
export default Login;
