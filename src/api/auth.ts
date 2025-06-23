import { supabase } from "@/lib/supabase";

import { SignUpForm } from "@/hooks/useSignUp";
import { LoginForm } from "@/hooks/useLogin";

export const signUp = async (form: SignUpForm) => {
  const { error } = await supabase.auth.signUp({
    ...form,
    options: {
      data: {
        name: form.name,
      },
    },
  });

  if (error) throw new Error(error.message);
};

export const login = async (form: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword(form);

  if (error) throw new Error(error.message);
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
