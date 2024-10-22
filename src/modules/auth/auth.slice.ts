import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux";

interface IAuthState {
  userId: string | undefined;
  loginError?: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId")
      ? (localStorage.getItem("userId") as string)
      : undefined
  } as IAuthState,
  selectors: {
    userId: (state: IAuthState) => state.userId,
    loginError: (state: IAuthState) => state.loginError
  },
  reducers: {
    addUser(state, action: PayloadAction<{ userId: string }>) {
      state.userId = action.payload.userId;
      state.loginError = undefined;
    },
    removeUser(state) {
      state.userId = undefined;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.loginError = action.payload;
    }
  }
}).injectInto(rootReducer);
