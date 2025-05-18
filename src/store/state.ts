import { create } from "zustand";

type State = {
  openSidebar: boolean;
};
type Actions = {
  open: () => void;
  close: () => void;
};

type StateLogin = {
  isLogin: boolean;
};
type ActionLogin = {
  changeAction: () => void;
};

type StateUser = {
  dataUser: any;
};
type ActionUser = {
  setDataUser: (data: any) => void;
};

const useSidebar = create<State & Actions>((set) => ({
  openSidebar: true,
  open: () => set((state) => ({ openSidebar: true })),
  close: () => set((state) => ({ openSidebar: false })),
}));

const useIsLogin = create<StateLogin & ActionLogin>((set) => ({
  isLogin: true,
  changeAction: () => set((state) => ({ isLogin: !state.isLogin })),
}));

const useStateUser = create<StateUser & ActionUser>((set) => ({
  dataUser: {},
  setDataUser: (data: any) => set((state) => ({ dataUser: data })),
}));

export { useSidebar, useIsLogin, useStateUser };
