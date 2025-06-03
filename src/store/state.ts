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

export interface UserType {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadata;
  user_metadata: Data;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
  userid?: number;
  username?: string;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: Data;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}

export interface Data {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

type StateUser = {
  dataUser: UserType;
};
type ActionUser = {
  setDataUser: (data: any) => void;
};

type StateProjectName = {
  name: string;
  id: number;
};
type ActionProjectName = {
  setName: (data: string) => void;
  setId: (id: number) => void;
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
  dataUser: {} as UserType,
  setDataUser: (data: UserType) => set((state) => ({ dataUser: data })),
}));

const useStateProject = create<StateProjectName & ActionProjectName>((set) => ({
  id: 0,
  name: "",
  setName: (name: string) => set((state) => ({ name: name })),
  setId: (id: number) => set((state) => ({ id: id })),
}));

export { useSidebar, useIsLogin, useStateUser, useStateProject };
