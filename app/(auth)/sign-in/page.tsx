"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInScheme } from "@/lib/validations";
const SignIn = () => {
  return (
    <AuthForm
      formType="Sign_In"
      schema={SignInScheme}
      defaultValue={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignIn;
