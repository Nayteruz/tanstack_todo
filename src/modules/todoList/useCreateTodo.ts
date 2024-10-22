import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodoDto, todoListApi } from "./api";
import { FormEvent } from "react";
import { nanoid } from "nanoid";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const onCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData) as Partial<ITodoDto>;

    createTodoMutation.mutate(
      {
        id: nanoid(),
        title: data.title ?? "",
        done: false,
        userId: "1"
      },
      {
        // onSuccess: () => {
        //   // queryClient.invalidateQueries({
        //   //   queryKey: [todoListApi.baseKey]
        //   // });
        //   // не понятно как это работает, нужно разобраться
        // }
      }
    );

    e.currentTarget.reset();
  };

  return {
    onCreate,
    isPending: createTodoMutation.isPending
  };
};
