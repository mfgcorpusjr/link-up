import { View } from "react-native";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import BackButton from "@/components/common/BackButton";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z.string({
    required_error: "Password is required",
  }),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <KeyboardAvoidingScrollView>
        <View className="gap-16">
          <BackButton />

          <View>
            <Text variant="title">Hey,</Text>
            <Text variant="title">Welcome Back</Text>
          </View>

          <View className="gap-3">
            <Text className="mb-3">Please login to continue</Text>

            <View>
              <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your email"
                    icon={<Icon name="mail-outline" color="grey" />}
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />

              <Text className="p-1" variant="error">
                {errors?.email?.message}
              </Text>
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your password"
                    icon={<Icon name="lock-closed-outline" color="grey" />}
                    autoCapitalize="none"
                    secureTextEntry
                  />
                )}
                name="password"
              />

              <Text className="p-1" variant="error">
                {errors?.password?.message}
              </Text>
            </View>

            <View className="gap-4">
              <Button text="Login" onPress={handleSubmit(handleLogin)} />

              <View className="flex-row justify-center items-center gap-1">
                <Text>Don't have an account?</Text>
                <Link href="/sign-up" asChild dismissTo>
                  <Text variant="link">Sign Up</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
