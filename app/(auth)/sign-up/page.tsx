"use client";
import  AuthForm  from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="Sign_Up"
      schema={SignUpSchema}
      defaultValue={{ email: "", password: "", name:"", username: ""}}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
