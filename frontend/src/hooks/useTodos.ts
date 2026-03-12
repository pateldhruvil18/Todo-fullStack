import { useQuery } from "@tanstack/react-query"
import { fetchTodos } from "../services/todo.service"

export const useTodos = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn : fetchTodos,
        
    })
};