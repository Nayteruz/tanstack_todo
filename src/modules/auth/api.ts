import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

export interface IUserDto {
  id: string;
  login: string;
  password: string;
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

export const authApi = {
  baseKey: "users",

  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [authApi.baseKey, "byId", id],
      queryFn: meta =>
        jsonApiInstance<IUserDto>(`/users/${id}`, {
          signal: meta.signal
        })
    });
  },

  loginUser: async ({
    login,
    password
  }: {
    login: string;
    password: string;
  }) => {
    if (!login || !password) {
      return;
    }

    return jsonApiInstance<IUserDto[]>(
      `/users?login=${login}&password=${password}`
    ).then(r => r[0] as IUserDto | undefined);
  }
};
