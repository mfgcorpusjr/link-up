import { FlatList, RefreshControl, ActivityIndicator } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import ListEmpty from "@/components/common/ListEmpty";
import NotificationItem from "@/components/NotificationItem";

import useNotification from "@/hooks/useNotification";

import useAuthStore from "@/store/useAuthStore";

import colors from "@/constants/colors";

export default function NotificationsScreen() {
  const profile = useAuthStore((state) => state.profile);

  const {
    getAll: {
      isLoading,
      data,
      isRefetching,
      refetch,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    },
  } = useNotification(profile!);

  return (
    <ScreenWrapper>
      <FlatList
        data={data?.pages.flat() || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.tint}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        ListHeaderComponent={
          <ScreenHeader title="Notifications" leftIcon={<BackButton />} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator className="text-tint" />
          ) : null
        }
        ListEmptyComponent={
          <ListEmpty text="No notifications found" isLoading={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-5 p-1"
      />
    </ScreenWrapper>
  );
}
