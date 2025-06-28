import { supabase } from "@/lib/supabase";

import { SignUpForm } from "@/schema/signUp";
import { LoginForm } from "@/schema/login";

export const signUp = async (payload: SignUpForm) => {
  const { error } = await supabase.auth.signUp({
    ...payload,
    options: {
      data: {
        name: payload.name,
      },
    },
  });

  if (error) throw new Error(error.message);
};

export const login = async (payload: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) throw new Error(error.message);
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
