import { View } from "react-native";
import { Link } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import BackButton from "@/components/common/BackButton";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

import useLoginForm, { LoginForm } from "@/hooks/useLoginForm";

export default function LoginScreen() {
  const {
    form: { Controller, control, errors, handleSubmit },
    query: { mutate, isPending },
  } = useLoginForm();

  return (
    <ScreenWrapper className="pb-4">
      <KeyboardAvoidingScrollView>
        <View className="gap-16">
          <BackButton />

          <View>
            <Text variant="title">Hey,</Text>
            <Text variant="title">Welcome Back</Text>
          </View>

          <View className="gap-3">
            <Text variant="caption" className="mb-3">
              Please login to continue
            </Text>

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
              <Button
                text="Login"
                isLoading={isPending}
                onPress={handleSubmit((data: LoginForm) => mutate(data))}
              />

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
