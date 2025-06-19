import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

import { getProfile } from "@/api/profile";

import { Profile } from "@/types/models";

type AuthStore = {
  session: Session | null;
  profile: Profile | null;
  initAuth: () => void;
  setProfile: (id: string) => void;
};

const useAuthStore = create<AuthStore>()((set, get) => ({
  session: null,
  profile: null,

  initAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session });

      session ? get().setProfile(session.user.id) : set({ profile: null });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });

      session ? get().setProfile(session.user.id) : set({ profile: null });
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
