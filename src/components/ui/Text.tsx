import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type Variant = "body" | "link" | "title" | "logo";

type TextProps = {
  variant?: Variant;
} & RNTextProps;

export default function Text({ variant = "body", ...rest }: TextProps) {
  const textClass: Record<Variant, string> = {
    body: "text-base text-zinc-600",
    link: "text-base text-tint font-bold",
    title: "text-3xl text-zinc-900 font-bold",
    logo: "text-4xl text-zinc-900 font-bold",
  };

  return (
    <RNText {...rest} className={twMerge(textClass[variant], rest.className)} />
  );
}
