import { useQuery } from "@tanstack/react-query";

import { get } from "@/api/post";

const usePostDetails = (id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => get(id),
  });

  return {
    query: {
      data,
      isLoading,
      error,
    },
  };
};

export default usePostDetails;
