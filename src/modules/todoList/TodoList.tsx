// import { useInfiniteQuery } from "@tanstack/react-query";
// import { todoListApi } from "./api";
// import { useIntersection } from "../../shared/hooks/useIntersection";
// import { ITodoDto, todoListApi } from "./api";
// import { useMutation } from "@tanstack/react-query";
// import { nanoid } from "nanoid";
import { useTodoList } from "./useTodoList";
import { useCreateTodo } from "./useCreateTodo";
import { useDeleteTodo } from "./useDeleteTodo";
import { useToggleTodo } from "./useToggleTodo";
import { LogoutBtn } from "../auth/LogoutBtn";

export const TodoList = () => {
  const { tasks, error, isLoading } = useTodoList();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();
  // const { getTasks } = todoListApi;
  // const [page, setPage] = useState(1);

  // const { data: tasks, error, isPlaceholderData, isLoading } = useQuery({
  //   queryKey: ["tasks", "list", { page }],
  //   queryFn: meta => getTasks({ page }, meta),
  //   placeholderData: keepPreviousData,
  //   enabled: enabled
  // });

  // const {
  //   data: tasks,
  //   error,
  //   isPlaceholderData,
  //   isPending,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage
  // } = useInfiniteQuery({
  //   // queryKey: ["tasks", "list"],
  //   // // функция запроса данных.
  //   // // meta - параметры запроса
  //   // // meta.pageParam - текущая страница
  //   // queryFn: meta => getTasks({ page: meta.pageParam }, meta),
  //   // // переключатель включен/отключен
  //   // enabled: enabled,
  //   // // начальная страница
  //   // initialPageParam: 1,
  //   // // запрашивает следующую страницу, если она есть и ее нужно передавать в getTasks
  //   // getNextPageParam: result => result?.next,
  //   // // обрабатывает результаты запроса в виде массива
  //   // select: result => result.pages.flatMap(page => page.data)
  //   ...todoListApi.getTodoListInfinityQueryOptions(),
  //   enabled: enabled
  // });

  // const cursorRef = useIntersection(() => {
  //   fetchNextPage();
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w[1200px] mt-10">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold mb-3">Todo list</h2>
        <LogoutBtn />
      </div>
      <form
        onSubmit={createTodo.onCreate}
        className="flex flex-col gap-3 mb-10"
      >
        <input
          type="text"
          placeholder="Добавить todo"
          className="rounded p-2 border border-teal-500"
          name="title"
        />
        <button
          disabled={createTodo.isPending}
          className="rounded p-2 border border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Добавить
        </button>
      </form>
      {isLoading && <div>Загрузка...</div>}
      <div className={`flex flex-col gap-4`}>
        {tasks?.map(task => (
          <div
            className="flex gap-3 justify-between items-center border border-slate-300 rounded-lg p-2 hover:border-slate-950"
            key={task.id}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTodo(task.id, task.done)}
            />
            <span className="mr-auto">{task.title}</span>
            <button
              disabled={deleteTodo.getIsPending(task.id)}
              className="text-rose-500 text-bold disabled:text-rose-100"
              onClick={() => deleteTodo.onDelete(task.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      {/* {cursor} */}
      {/* <div className="mt-5 flex gap-5" ref={cursorRef}>
        {!hasNextPage && <div>Нет данных для загрузки...</div>} */}
      {/* <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          className="p-3 min-w-[100px] rounded border border-teal-800 "
        >
          Prev
        </button>
        <button
          onClick={() => setPage(Math.min(page + 1, tasks?.pages ?? 1))}
          className="p-3 min-w-[100px] rounded border border-teal-800 "
        >
          Next
        </button> */}
      {/* </div> */}
    </div>
  );
};
