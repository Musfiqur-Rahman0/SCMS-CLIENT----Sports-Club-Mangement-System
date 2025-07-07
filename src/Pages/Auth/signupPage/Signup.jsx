import { AuthForm } from "@/Pages/Shared/AuthForm";
import React from "react";

const Signup = () => {
  const handleSignup = () => {
    console.log("ok");
  };

  const handleGoogleLogin = () => {
    console.log("loged in with google ");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
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
