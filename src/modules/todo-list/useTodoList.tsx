import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

// export const useTodoList = () => {
//   const {
//     data: tasks,
//     error,
//     isPlaceholderData,
//     isPending,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage
//   } = useInfiniteQuery({
//     ...todoListApi.getTodoListInfinityQueryOptions()
//   });

//   const cursorRef = useIntersection(() => {
//     fetchNextPage();
//   });

//   const cursor = (
//     <div className="mt-5 flex gap-5" ref={cursorRef}>
//       {!hasNextPage && <div>Нет данных для загрузки...</div>}
//       {isFetchingNextPage && <div>Загрузка...</div>}
//     </div>
//   );

//   return {
//     tasks,
//     cursor,
//     error,
//     isPlaceholderData,
//     isPending,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage
//   };
// };

export const useTodoList = () => {
  const { data: tasks, error, isLoading } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => data.toReversed()
  });

  return {
    tasks,
    error,
    isLoading
  };
};
