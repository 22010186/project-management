import { create } from "zustand";

type State = {
  openSidebar: boolean;
};

type Actions = {
  open: () => void;
  close: () => void;
};

const useSidebar = create<State & Actions>((set) => ({
  openSidebar: true,
  open: () => set((state) => ({ openSidebar: true })),
  close: () => set((state) => ({ openSidebar: false })),
}));

export { useSidebar };
