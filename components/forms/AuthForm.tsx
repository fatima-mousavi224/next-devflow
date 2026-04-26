"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZodType } from "zod";
import ROUTES from "@/constants/routes"; 
import { ActionResponse } from "@/types/global";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValue: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "Sign_In" | "Sign_Up";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValue,
  onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
   const result = (await onSubmit(data)) as ActionResponse;

   if(result ?.success) {
    toast.success(formType === "Sign_In" ? "Signed in successfully" : "Signed up successfully");
    router.push(ROUTES.HOME);
   } else {
    toast.error(result.error?.message || "Something went wrong.");
   }

  };

  const buttonText = formType === "Sign_In" ? "Sign In" : "Sign Up";

  return (
    <div className="w-full"> 
      <form 
        id="auth-form" 
        className="mt-10 space-y-6" 
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FieldGroup className="space-y-3">
          {(Object.keys(defaultValue) as Array<keyof T>).map((key) => (
            <Controller
              key={key as string}
              name={key as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                  {/* استایل لیبل مطابق کد دوم */}
                  <FieldLabel className="paragraph-medium text-dark400_light700">
                    {String(key) === "email" 
                      ? "Email Address" 
                      : String(key).charAt(0).toUpperCase() + String(key).slice(1)}
                  </FieldLabel>
                  
                  {/* استایل اینپوت مطابق کد دوم */}
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    {...field}
                    id={`input-${String(key)}`}
                    placeholder={`Enter your ${String(key)}`}
                  />

                  {/* نمایش خطا */}
                  {fieldState.error && (
                    <FieldError className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>

        {/* دکمه با استایل گرادینت کد دوم */}
        <Button 
          disabled={form.formState.isSubmitting} 
          type="submit"
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
        >
          {form.formState.isSubmitting
            ? (formType === "Sign_In" ? "Signing In..." : "Signing Up...")
            : buttonText}
        </Button>

        {/* لینک‌های پایین فرم مطابق کد دوم */}
        <p className="paragraph-regular text-dark400_light700 mt-4 text-center">
          {formType === "Sign_In" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
                Sign in
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;// --------------------------------------------------------------------

