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

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValue: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: { message: string } }>;
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

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        toast.success(formType === "Sign_In" ? "Signed in successfully" : "Signed up successfully");
      } else {
        toast.error(result.error?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An error occurred.");
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
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
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

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   DefaultValues,
//   FieldValues,
//   Path,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import { z, ZodType } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import ROUTES from "@/constants/routes";
// import { toast } from "@/hooks/use-toast";

// type ActionResponse = {
//   success: boolean;
//   status?: number;
//   error?: {
//     message?: string;
//   };
// };

// interface AuthFormProps<T extends FieldValues> {
//   schema: ZodType<T>;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<ActionResponse>;
//   formType: "SIGN_IN" | "SIGN_UP";
// }

// const AuthForm = <T extends FieldValues>({
//   schema,
//   defaultValues,
//   formType,
//   onSubmit,
// }: AuthFormProps<T>) => {
//   const router = useRouter();

//   const form = useForm<T>({
//     resolver: zodResolver(schema),
//     defaultValues: defaultValues as DefaultValues<T>,
//   });

//   const handleSubmit: SubmitHandler<T> = async (data) => {
//     const result = (await onSubmit(data)) as ActionResponse;

//     if (result?.success) {
//       toast({
//         title: "Success",
//         description:
//           formType === "SIGN_IN"
//             ? "Signed in successfully"
//             : "Signed up successfully",
//       });

//       router.push(ROUTES.HOME);
//     } else {
//       toast({
//         title: `Error ${result?.status}`,
//         description: result?.error?.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleSubmit)}
//         className="mt-10 space-y-6"
//       >
//         {Object.keys(defaultValues).map((field) => (
//           <FormField
//             key={field}
//             control={form.control}
//             name={field as Path<T>}
//             render={({ field }) => (
//               <FormItem className="flex w-full flex-col gap-2.5">
//                 <FormLabel className="paragraph-medium text-dark400_light700">
//                   {field.name === "email"
//                     ? "Email Address"
//                     : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     required
//                     type={field.name === "password" ? "password" : "text"}
//                     {...field}
//                     className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}

//         <Button
//           disabled={form.formState.isSubmitting}
//           className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
//         >
//           {form.formState.isSubmitting
//             ? buttonText === "Sign In"
//               ? "Signin In..."
//               : "Signing Up..."
//             : buttonText}
//         </Button>

//         {formType === "SIGN_IN" ? (
//           <p>
//             Don&apos;t have an account?{" "}
//             <Link
//               href={ROUTES.SIGN_UP}
//               className="paragraph-semibold primary-text-gradient"
//             >
//               Sign up
//             </Link>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <Link
//               href={ROUTES.SIGN_IN}
//               className="paragraph-semibold primary-text-gradient"
//             >
//               Sign in
//             </Link>
//           </p>
//         )}
//       </form>
//     </Form>
//   );
// };

// export default AuthForm;

// --------------------------------------------------------

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Controller,
//   DefaultValues,
//   FieldValues,
//   Path,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { ZodType } from "zod";

// interface AuthFormProps<T extends FieldValues> {
//   schema: ZodType<T>;
//   defaultValue: T;
//   onSubmit: (data: T) => Promise<{ success: boolean }>;
//   formType: "Sign_In" | "Sign_Up";
// }

// const AuthForm = <T extends FieldValues>({
//   schema,
//   defaultValue,
//   onSubmit,
//   formType,
// }: AuthFormProps<T>) => {
//   const form = useForm<T>({
//     resolver: zodResolver(schema),
//     defaultValues: defaultValue as DefaultValues<T>,
//   });

//   const handleFormSubmit: SubmitHandler<T> = async (data) => {
//     try {
//       const result = await onSubmit(data);
//       if (result.success) {
//         toast.success("Success!");
//       } else {
//         toast.error("Something went wrong.");
//       }
//     } catch (error) {
//       toast.error("An error occurred.");
//     }
//   };

//   const buttonText = formType === "Sign_In" ? "Sign In" : "Sign Up";

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>{buttonText}</CardTitle>
//         <CardDescription>
//           {formType === "Sign_In"
//             ? "Enter your credentials to sign in."
//             : "Create a new account below."}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {/* دقت کنید: handleSubmit باید به تابع اصلی وصل شود */}
//         <form id="auth-form" onSubmit={form.handleSubmit(handleFormSubmit)}>
//           <FieldGroup>
//             {Object.keys(defaultValue).map((key) => (
//               <Controller
//                 key={key}
//                 name={key as Path<T>}
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid} className="mb-4">
//                     {/* ۱. اصلاح عنوان لیبل */}
//                     <FieldLabel className="capitalize">
//                       {key === "email"
//                         ? "Email Address"
//                         : key.replace(/([A-Z])/g, " $1")}
//                     </FieldLabel>

//                     {/* ۲. اصلاح اینپوت و تایپ پسورد */}
//                     <Input
//                       {...field}
//                       id={`input-${key}`}
//                       type={key === "password" ? "password" : "text"} // پسورد را مخفی نشان دهد
//                       aria-invalid={fieldState.invalid}
//                       placeholder={`Enter your ${key}...`} // پلیس‌هولدر داینامیک
//                     />

//                     {/* ۳. اصلاح توضیحات پایین فیلد */}
//                     <FieldDescription>
//                       {key === "username"
//                         ? "This is your public display name."
//                         : `Please enter your ${key}.`}
//                     </FieldDescription>

//                     {/* نمایش متن خطا */}
//                     {fieldState.error && (
//                       <FieldError className="text-red-500">
//                         {fieldState.error.message}
//                       </FieldError>
//                     )}
//                   </Field>
//                 )}
//               />
//             ))}
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button type="button" variant="outline" onClick={() => form.reset()}>
//           Reset
//         </Button>
//         {/* مقدار form باید با id فرم یکی باشد */}
//         <Button type="submit" form="auth-form">
//           {buttonText}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AuthForm;
