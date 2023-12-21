import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  pin: string | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("pin") === "test",
  pin: localStorage.getItem("pin"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      if (action.payload === "test") {
        state.isLoggedIn = true;
        state.pin = action.payload;
        localStorage.setItem("pin", action.payload);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.pin = null;
      localStorage.removeItem("pin");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
