// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

// import { api } from "./lib/api";
// import { ActionResponse } from "./types/global";
// import { SignInScheme } from "./lib/validations";
// import { IUserDoc } from "./database/user.model";
// import bcrypt from "bcryptjs";
// import { IAccountDoc } from "./database/acount.model";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub,
//     Google,
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = SignInScheme.safeParse(credentials);

//         if (!validatedFields.success) return null;

//         const { email, password } = validatedFields.data;

//         const { data: existingAccount } =
//           (await api.acounts.getByProvider(email)) as ActionResponse<IAccountDoc>;

//         if (!existingAccount) return null;

//         if (!existingAccount.password) return null; // ✅ جلوگیری از crash

//         const { data: existingUser } =
//           (await api.users.getById(
//             existingAccount.userId.toString()
//           )) as ActionResponse<IUserDoc>;

//         if (!existingUser) return null;

//         const isValidPassword = await bcrypt.compare(
//           password,
//           existingAccount.password
//         );

//         if (!isValidPassword) return null;

//         return {
//           id: existingUser._id.toString(), // ✅ مهم
//           name: existingUser.name,
//           email: existingUser.email,
//           image: existingUser.image,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub as string;
//       }
//       return session;
//     },

//     async jwt({ token, account }) {
//       if (account) {
//         const { data: existingAccount, success } =
//           (await api.acounts.getByProvider(
//             account.type === "credentials"
//               ? token.email!
//               : account.providerAccountId
//           )) as ActionResponse<IAccountDoc>;

//         if (!success || !existingAccount) return token;

//         const userId = existingAccount.userId;
//         if (userId) token.sub = userId.toString();
//       }

//       return token;
//     },

//     async signIn({ user, profile, account }) {
//       if (account?.type === "credentials") return true;
//       if (!account || !user) return false;

//       const userInfo = {
//         name: user.name!,
//         email: user.email!,
//         image: user.image!,
//         username:
//           account.provider === "github"
//             ? (profile?.login as string)
//             : (user.name?.toLowerCase() as string),
//       };

//       const { success } = (await api.auth.oAuthSignIn({
//         user: userInfo,
//         provider: account.provider as "github" | "google",
//         providerAcountId: account.providerAccountId,
//       })) as ActionResponse;

//       return success;
//     },
//   },
// });


import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      async authorize(credentials) {
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub as string;
      return session;
    },

    async jwt({ token, account }) {
      if (account) token.sub = account.providerAccountId;
      return token;
    },
  },
});