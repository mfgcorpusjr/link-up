import { View } from "react-native";

import Icon from "@/components/common/Icon";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

import useComment from "@/hooks/useComment";

import { CommentForm as TCommentForm } from "@/schemas/comment";

import { PostItem } from "@/types/models";

import colors from "@/constants/colors";

type CommentFormProps = {
  post: PostItem;
};

export default function CommentForm({ post }: CommentFormProps) {
  const {
    Controller,
    createForm: {
      control,
      handleSubmit,
      formState: { errors },
    },
    create: { mutate, isPending },
  } = useComment(post);

  return (
    <View className="-mb-1">
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Controller
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Type comment"
              />
            )}
            name="text"
          />
        </View>

        <Button
          containerClassName="w-14 self-center"
          variant="outlined"
          icon={<Icon name="send-outline" color={colors.tint} />}
          isLoading={isPending}
          onPress={handleSubmit((data: TCommentForm) => mutate(data))}
        />
      </View>

      <Text className="p-1" variant="error">
        {errors?.text?.message}
      </Text>
    </View>
  );
}
