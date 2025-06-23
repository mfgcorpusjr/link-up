import { Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { logout } from "@/api/auth";

const useLogout = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: logout,
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to continue?", [
      { text: "Cancel" },
      { text: "Ok", style: "destructive", onPress: () => mutate() },
    ]);
  };

  return {
    isPending,
    logout: handleLogout,
  };
};

export default useLogout;
