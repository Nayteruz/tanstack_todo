import { Login } from "../modules/auth/login";
import { useUser } from "../modules/auth/useUser";
import { TodoList } from "../modules/todoList/TodoList";

export const App = () => {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return <TodoList />;
  }

  return <Login />;
};
