import { IUser } from "@/database/user.model";
import { fetchHandeler } from "./handlers/fetch";
import { IAccount } from "@/database/acount.model";
import ROUTES from "@/constants/routes";

const API_BASE_URL =
  process.env.NEXT_BUPLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  auth: {
    oAuthSignIn : ({user, provider, providerAcountId}: SignInWithAuthParams) => {
       return fetchHandeler(`${API_BASE_URL}/auth/${ROUTES.SIGN_IN_WITH_AUTH}`, {
            method: "POST",
            body: JSON.stringify({user, provider, providerAcountId})
        })
    }
  },

  users: {
    getAll: () => fetchHandeler(`${API_BASE_URL}/users`),
    getById: (id: string) => fetchHandeler(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandeler(`${API_BASE_URL}/users/email/`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    create: (userData: Partial<IUser>) =>
      fetchHandeler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    update: (id: string, userData: Partial<IUser>) =>
      fetchHandeler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),

    delete: (id: string) =>
      fetchHandeler(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },

    acounts: {
    getAll: () => fetchHandeler(`${API_BASE_URL}/acounts`),
    getById: (id: string) => fetchHandeler(`${API_BASE_URL}/acounts/${id}`),
    getByProvider: (providerAcountId: string) =>
      fetchHandeler(`${API_BASE_URL}/acounts/provider/`, {
        method: "POST",
        body: JSON.stringify({ providerAcountId }),
      }),

    create: (acountData: Partial<IAccount>) =>
      fetchHandeler(`${API_BASE_URL}/acounts`, {
        method: "POST",
        body: JSON.stringify(acountData),
      }),

    update: (id: string, acountData: Partial<IAccount>) =>
      fetchHandeler(`${API_BASE_URL}/acounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(acountData),
      }),

    delete: (id: string) =>
      fetchHandeler(`${API_BASE_URL}/acounts/${id}`, { method: "DELETE" }),
  },

};
