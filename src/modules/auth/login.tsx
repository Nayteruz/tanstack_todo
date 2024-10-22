import { useAppDispatch, useAppSelector } from "../../shared/redux";
import { authSlice } from "./auth.slice";
import { loginThunk, useLoginLoading } from "./loginThunk";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const login = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    dispatch(loginThunk(login, password));
  };

  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <h1 className="text-bold text-2xl">Login</h1>
        <input
          type="text"
          name="login"
          className="p-5 rounded border border-slate-500"
          placeholder="Login"
        />
        <input
          type="password"
          name="password"
          className="p-5 rounded border border-slate-500"
          placeholder="Password"
        />
        {loginError && <div className="text-red-500">{loginError}</div>}
        <button
          disabled={isLoading}
          className="p-5 rounded border bg-teal-400 border-teal-500 text-white disabled:opacity-50"
        >
          Вход
        </button>
      </form>
    </div>
  );
};
