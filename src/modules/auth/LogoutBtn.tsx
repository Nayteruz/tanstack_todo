import { useAppDispatch } from "../../shared/redux";
import { logoutThunk } from "./logoutThunk";

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <button
      onClick={onLogout}
      className="rounded p-2 border bg-rose-700 text-white border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Logout
    </button>
  );
};
