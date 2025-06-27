import { View } from "react-native";

import Icon from "@/components/common/Icon";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

import useComment, { CommentForm as TCommentForm } from "@/hooks/useComment";

import { PostItem } from "@/types/models";

import colors from "@/constants/colors";

type CommentFormProps = {
  post: PostItem;
};

export default function CommentForm({ post }: CommentFormProps) {
  const {
    form: { Controller, control, handleSubmit, errors },
    create,
    isCreating,
  } = useComment(post);

  return (
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

        <Text className="p-1" variant="error">
          {errors?.text?.message}
        </Text>
      </View>

      <Button
        containerClassName="w-14"
        variant="outlined"
        icon={<Icon name="send-outline" color={colors.tint} />}
        isLoading={isCreating}
        onPress={handleSubmit((data: TCommentForm) => create(data))}
      />
    </View>
  );
}
