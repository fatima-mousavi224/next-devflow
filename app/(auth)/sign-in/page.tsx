"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInScheme } from "@/lib/validations";
const SignIn = () => {
  return (
    <AuthForm
      formType="Sign_In"
      schema={SignInScheme}
      defaultValue={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
