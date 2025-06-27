import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

import { get as getProfile } from "@/api/profile";

import { Profile } from "@/types/models";

type AuthStore = {
  isLoading: boolean;
  session: Session | null;
  profile: Profile | null;
  initAuth: () => void;
  setProfile: (id: string) => void;
};

const useAuthStore = create<AuthStore>()((set, get) => ({
  isLoading: true,
  session: null,
  profile: null,

  initAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session });

      session ? get().setProfile(session.user.id) : set({ profile: null });

      set({ isLoading: false });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });

      session ? get().setProfile(session.user.id) : set({ profile: null });

      set({ isLoading: false });
    });
  },

  setProfile: async (id: string) => {
    try {
      const data = await getProfile(id);
      set({ profile: data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
