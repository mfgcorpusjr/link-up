import { useQuery } from "@tanstack/react-query";

import { getPost } from "@/api/post";

const usePostDetails = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
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
