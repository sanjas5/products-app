import { create } from "zustand";

interface SnackbarState {
  open: boolean;
  message: string;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  showSnackbar: (message: string) => set({ open: true, message }),
  hideSnackbar: () => set({ open: false, message: "" }),
}));
