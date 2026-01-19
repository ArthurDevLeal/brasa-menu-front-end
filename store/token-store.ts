import { create } from "zustand";
import Cookies from "js-cookie";

type TokenStore = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  getToken: () => string | null;
};

export const useTokenStore = create<TokenStore>((set, get) => ({
  token: Cookies.get("token") || null,
  setToken: (token: string) => {
    Cookies.set("token", token, { expires: 1 }); 
    set({ token });
  },
  removeToken: () => {
    Cookies.remove("token");
    set({ token: null });
  },
  getToken: () => get().token,
}));