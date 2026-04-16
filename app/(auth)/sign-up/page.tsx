"use client";
import  AuthForm  from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="Sign_Up"
      schema={SignUpSchema}
      defaultValue={{ email: "", password: "", name:"", username: ""}}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;
