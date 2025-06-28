import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import {
  signUp as _signUp,
  login as _login,
  logout as _logout,
} from "@/api/auth";

import signUpFormSchema from "@/schema/signUp";
import loginFormSchema from "@/schema/login";

const useAuth = () => {
  const signUpForm = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const signUp = useMutation({
    mutationFn: _signUp,
    onError: (error) => {
      signUpForm.reset();

      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const login = useMutation({
    mutationFn: _login,
    onError: (error) => {
      loginForm.reset();

      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const logout = useMutation({
    mutationFn: _logout,
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to continue?", [
      { text: "Cancel" },
      { text: "Ok", style: "destructive", onPress: () => logout.mutate() },
    ]);
  };

  return {
    Controller,
    signUpForm,
    signUp,
    loginForm,
    login,
    logout: confirmLogout,
  };
};

export default useAuth;
