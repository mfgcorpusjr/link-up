import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type Variant =
  | "caption"
  | "body"
  | "link"
  | "error"
  | "subHeadline"
  | "headline"
  | "title"
  | "logo";

type TextProps = {
  variant?: Variant;
} & RNTextProps;

export default function Text({ variant = "body", ...rest }: TextProps) {
  const textClass: Record<Variant, string> = {
    caption: "text-base text-zinc-400",
    body: "text-lg text-zinc-600",
    link: "text-lg text-tint font-bold",
    error: "text-base text-rose-500",
    subHeadline: "text-xl text-zinc-900 font-semibold",
    headline: "text-2xl text-zinc-900 font-semibold",
    title: "text-3xl text-zinc-900 font-bold",
    logo: "text-4xl text-zinc-900 font-bold",
  };

  return (
    <RNText {...rest} className={twMerge(textClass[variant], rest.className)} />
  );
}
