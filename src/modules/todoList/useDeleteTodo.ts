import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },
    async onSuccess(_, deletedId) {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        todos => todos?.filter(todo => todo.id !== deletedId)
      );
    }
  });

  return {
    onDelete: deleteTodoMutation.mutate,
    isPending: deleteTodoMutation.isPending,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id
  };
};
