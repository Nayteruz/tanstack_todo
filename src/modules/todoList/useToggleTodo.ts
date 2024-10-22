import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async newTodo => {
      // отмена запроса на предыдущее значение
      // чтобы не накапливались ограничения на количество запросов
      await queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey]
      });

      // Получаем данные из кеша
      const previousTodos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey
      );

      // Optimistically update to the new value
      // обновляем значение в кеше
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        old =>
          old?.map(todo =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          )
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newTodo, context) => {
      if (context) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          context.previousTodos
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      done: !done
    });
  };

  return {
    toggleTodo
  };
};