import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      updateUser: (newUser) => set({ user: newUser }),
      token: "",
      updateToken: (newToken) => set({ token: newToken }),
      logout: () => set({ user: null, token: "" }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);
