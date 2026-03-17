import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/todo.service";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,

    // ✅ cache for 5 minutes
    staleTime: 1000 * 60 * 5,

    // ✅ keep previous data while refetching
    placeholderData: (prev) => prev,

    // ✅ retry only once if error
    retry: 1,

    // ✅ disable refetch on tab switch (optional)
    refetchOnWindowFocus: false,
  });
};