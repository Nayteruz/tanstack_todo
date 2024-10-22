import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { useAppSelector } from "../../shared/redux";
import { authSlice } from "./auth.slice";

export const useUser = () => {
  const userId = useAppSelector(authSlice.selectors.userId);
  return useQuery({
    ...authApi.getUserById(userId!),
    enabled: !!userId
  });
};