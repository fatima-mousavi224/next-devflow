import { email, z } from "zod";
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

   content: z.string().min(1, { message: "Body is required." }),
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
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 charactres long" }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: "Please provide a valid email URL." })
    .optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid email URL." })
    .optional(),
  reputation: z.number().optional(),
});

export const AcountSchema = z.object({
  userId: z.string().min(1, { message: "User id is requierd." }),
  name: z.string().min(1, { message: "Name is requierd." }),
  image: z.string().url({ message: "Please provide a valide URL" }),
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
    })
    .optional(),

  provider: z.string().min(1, { message: "Provide is requierd" }),
  providerAcountId: z
    .string()
    .min(1, { message: "Provider acount Id is requierd." }),
});


export const SignInWithSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAcountId: z.string().min(1, {message: "Provider Acount Id is requierd."}),
  user: z.object({name: z.string().min(1, {message: "Name is requierd"}),
  username: z.string().min(3, {message: "User name must be at least 3 characters long."}),
  email: z.string().email({message: "Plase provide a valide email address."}),
  image: z.string().url("invaild image Url").optional()
}),

})

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, {message: "Question ID is requierd."})
})

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, {message: "Question Id is Requierd"})
})

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional()
})

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, {message: "Tag id is requierd."})
})

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, {message: "Question Id is requierd."})
})

export const AnswerSchema = z.object({
  content: z.string().min(100, {message: "Answer has to have more than 100 characters."})
})