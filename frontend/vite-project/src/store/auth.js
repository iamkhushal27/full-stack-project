import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  updateUser: (newUser) => set({ user: newUser }),
  token: "",
  updateToken: (newToken) => set({ token: newToken }),
}));
