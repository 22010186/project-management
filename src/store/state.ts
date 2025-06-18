import { create } from "zustand";
import { Project, Task } from "./type";

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
  teamid?: number;
  profilepictureurl?: string;
  cognitoid?: string;
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
  dataUser?: UserType;
  isOwner?: boolean;
};
type ActionUser = {
  setDataUser: (data: any) => void;
  setOwner: (data: boolean) => void;
};

type StateProjectName = {
  name: string;
  id: number;
  projects?: Project[];
};
type ActionProjectName = {
  setName: (data: string) => void;
  setId: (id: number) => void;
  setProjects: (data?: Project[]) => void;
};
type StateAllTasks = {
  tasks?: Task[];
};
type ActionAllTasks = {
  setTasks: (tasks?: Task[]) => void;
};

const useIsLogin = create<StateLogin & ActionLogin>((set) => ({
  isLogin: true,
  changeAction: () => set((state) => ({ isLogin: !state.isLogin })),
}));

const useStateUser = create<StateUser & ActionUser>((set) => ({
  dataUser: undefined,
  isOwner: false,
  setDataUser: (data: UserType) => set((state) => ({ dataUser: data })),
  setOwner: (data: boolean) => set((state) => ({ isOwner: data })),
}));

const useStateProject = create<StateProjectName & ActionProjectName>((set) => ({
  id: 0,
  name: "",
  projects: undefined,
  setName: (name: string) => set((state) => ({ name: name })),
  setId: (id: number) => set((state) => ({ id: id })),
  setProjects: (projects?: Project[]) =>
    set((state) => ({ projects: projects })),
}));

const useStateAllTask = create<StateAllTasks & ActionAllTasks>((set) => ({
  tasks: undefined,
  setTasks: (tasks?: Task[]) => set((state) => ({ tasks: tasks })),
}));

export { useIsLogin, useStateUser, useStateProject, useStateAllTask };
