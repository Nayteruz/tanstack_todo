import {
  combineSlices,
  createSelector,
  ThunkAction,
  UnknownAction,
  configureStore
} from "@reduxjs/toolkit";

import { useDispatch, useSelector, useStore } from "react-redux";

export const rootReducer = combineSlices();

export type AppState = any;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  UnknownAction
>;

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = () => useStore<AppState>();
export const createAppSelector = createSelector.withTypes<AppState>();

export type RootState = ReturnType<typeof rootReducer>;
