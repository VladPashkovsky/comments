import {create} from 'zustand';
import { User } from '../../shared/models/types.ts';

interface AuthState {
  user: User & { accessToken: string, refreshToken: string } | null;
  isActivated: boolean;
}

const loginStore = create<AuthState>((set) => ({
  user: null,
  isActivated: false,
  login: async (data: any) => {
    set({ user: data, isActivated: true });
  },
  register: async (data: any) => {
    set({ user: data, isActivated: true });
  },
  current: async (data: any) => {
    set({ user: data, isActivated: true });
  },
  logout: () => {
    set({ user: null, isActivated: false });
  },
}));

export default loginStore;