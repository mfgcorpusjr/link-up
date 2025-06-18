import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

type AuthStore = {
  session: Session | null;
  initAuth: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  session: null,

  initAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session });
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },
}));

export default useAuthStore;
