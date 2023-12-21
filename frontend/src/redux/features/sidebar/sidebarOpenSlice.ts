import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 사이드 바 open 상태 관리
interface sidebarOpenState {
  isSidebarOpen: boolean;
}

const initialState: sidebarOpenState = {
  isSidebarOpen: true,
};

export const sidebarOpenSlice = createSlice({
  name: "sidebarOpen",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = sidebarOpenSlice.actions;

export default sidebarOpenSlice.reducer;
