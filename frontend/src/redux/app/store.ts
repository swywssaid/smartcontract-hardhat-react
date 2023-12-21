import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sidebarOpenReducer from "../features/sidebar/sidebarOpenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebarOpen: sidebarOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
