import { Button } from "react-native";

import { logout } from "@/api/auth";

export default function HomeScreen() {
  const handleLogout = async () => await logout();

  return <Button title="Logout" onPress={handleLogout} />;
}
