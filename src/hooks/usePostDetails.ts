import { useQuery } from "@tanstack/react-query";

import { getPost } from "@/api/post";

const usePostDetails = (id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  return {
    query: {
      isLoading,
      data,
      error,
    },
  };
};

export default usePostDetails;
