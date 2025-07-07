import { AuthForm } from "@/Pages/Shared/AuthForm";
import React from "react";

const Login = () => {
  const handleLogin = (data) => {
    console.log("Login Data", data);
    // TODO: Call your login API here
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
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
