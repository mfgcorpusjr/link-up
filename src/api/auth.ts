import { supabase } from "@/lib/supabase";

type Login = {
  email: string;
  password: string;
};

type SignUp = Login & {
  name: string;
};

export const login = async (payload: Login) => {
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) throw new Error(error.message);
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const signUp = async (payload: SignUp) => {
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
