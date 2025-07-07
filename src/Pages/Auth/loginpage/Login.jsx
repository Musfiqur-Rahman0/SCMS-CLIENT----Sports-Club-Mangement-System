import useAuth from "@/Hooks/useAuth";
import { AuthForm } from "@/Pages/Shared/AuthForm";
import React from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginWithGoogle, login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    const { email, password } = data;
    login(email, password);
    // TODO: Call your login API here
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    navigate("/");
    // TODO: Google auth here
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        submitText="Login"
        googleText="Login with Google"
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        linkText="Don't have an account? Sign up"
        linkHref="/signup"
      />
    </div>
  );
};
export default Login;
