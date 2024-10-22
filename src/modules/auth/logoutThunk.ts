import { useMutation } from "@tanstack/react-query";
import { AppThunk } from "../../shared/redux";
import { authSlice } from "./auth.slice";
import { queryClient } from "../../shared/api/query-client";

export const logoutThunk = (): AppThunk => async dispatch => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();
  localStorage.removeItem("userId");
};

export const useLoginLoading = () =>
  useMutation({ mutationKey: ["login"] }).isPending;
