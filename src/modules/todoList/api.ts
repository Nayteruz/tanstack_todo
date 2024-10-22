import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

// const BASE_URL = "http://localhost:8000";

export interface ITodoDto {
  id: string;
  title: string;
  done: boolean;
  userId: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  first: number;
  last: number;
  items: number;
  next: number | null;
  prev: number | null;
  pages: number;
}

export const todoListApi = {
  //   getTasks: async (
  //     { page }: { page: number },
  //     { signal }: { signal: AbortSignal }
  //   ) => {
  //     const delay = (ms: number) =>
  //       new Promise(resolve => setTimeout(resolve, ms));
  //     await delay(5000);

  //     return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
  //       signal
  //     }).then(res => res.json() as Promise<IPaginatedResult<ITodoDto>>);
  //   },

  //   getTodoListQueryOptions: ({ page }: { page: number }) => {
  //     return queryOptions({
  //       queryKey: ["tasks", "list", { page }],
  //       queryFn: meta =>
  //         jsonApiInstance<IPaginatedResult<ITodoDto>>(
  //           `/tasks?_page=${page}&_per_page=10`,
  //           {
  //             signal: meta.signal
  //           }
  //         )
  //     });
  //   },
  baseKey: "tasks",

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: meta =>
        jsonApiInstance<ITodoDto[]>(`/tasks`, {
          signal: meta.signal
        })
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      // функция запроса данных.
      // meta - параметры запроса
      // meta.pageParam - текущая страница
      queryFn: meta =>
        jsonApiInstance<IPaginatedResult<ITodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal
          }
        ),
      // переключатель включен/отключен
      // начальная страница
      initialPageParam: 1,
      // запрашивает следующую страницу, если она есть и ее нужно передавать в getTasks
      getNextPageParam: result => result?.next,
      // обрабатывает результаты запроса в виде массива
      select: result => result.pages.flatMap(page => page.data)
    });
  },

  createTodo: (data: ITodoDto) => {
    return jsonApiInstance<ITodoDto>(`/tasks`, {
      method: "POST",
      json: data
    });
  },

  updateTodo: (data: Partial<ITodoDto> & { id: string }) => {
    return jsonApiInstance<ITodoDto>(`/tasks/${data.id}`, {
      method: "PATCH",
      json: data
    });
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: "DELETE"
    });
  }
};
