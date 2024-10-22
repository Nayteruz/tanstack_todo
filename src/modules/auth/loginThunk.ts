import { MutationObserver, useMutation } from "@tanstack/react-query";
import { AppThunk } from "../../shared/redux";
import { queryClient } from "../../shared/api/query-client";
import { authApi } from "./api";
import { authSlice } from "./auth.slice";

export const loginThunk = (
  login: string,
  password: string
): AppThunk => async dispatch => {
  try {
    const user = await new MutationObserver(queryClient, {
      mutationKey: ["login"],
      mutationFn: authApi.loginUser
    }).mutate({ login, password });

    if (user) {
      dispatch(authSlice.actions.addUser({ userId: user.id }));
      queryClient.setQueryData(authApi.getUserById(user.id).queryKey, user);
      localStorage.setItem("userId", user.id);
    } else {
      dispatch(authSlice.actions.setError("Неверный логин или пароль"));
    }
  } catch (error) {
    console.error(error);
  }
};

export const useLoginLoading = () =>
  useMutation({ mutationKey: ["login"] }).isPending;
