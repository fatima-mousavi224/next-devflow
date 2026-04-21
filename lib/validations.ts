import { Tag } from "lucide-react";
import { Content } from "next/font/google";
import { title } from "process";
import { z } from "zod";
export const SignInScheme = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .email({ message: "please enter a valid email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(150, { message: "Title cannot exceed 150 characters." }),

  Content: z.string().min(1, { message: "Body is required." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "At least one tag is required." })
        .max(30, { message: "You can add up to 30 tags." }),
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "You can add up to 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  username: z.string().min(3, {message: "Username must be at least 3 charactres long"}),
  email: z.string().email({message: "Please provide a valid email address."}),
  bio: z.string().optional(),
  image: z.string().url({message: "Please provide a valid email URL."}).optional(),
  location: z.string().optional(),
  portfolio : z.string().url({message: "Please provide a valid email URL."}).optional(),
  reputation: z.number().optional()
})