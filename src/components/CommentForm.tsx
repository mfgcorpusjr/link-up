import { View } from "react-native";

import Icon from "@/components/common/Icon";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

import useCreateComment, {
  CommentForm as TCommentForm,
} from "@/hooks/useCreateComment";

import colors from "@/constants/colors";

type CommentFormProps = {
  postId: number;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const {
    form: { Controller, control, errors, handleSubmit },
    query: { isCreatingComment, handleCreateComment },
  } = useCreateComment(postId);

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
        isLoading={isCreatingComment}
        onPress={handleSubmit((data: TCommentForm) =>
          handleCreateComment(data)
        )}
      />
    </View>
  );
}
