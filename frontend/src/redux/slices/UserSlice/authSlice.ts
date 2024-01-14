import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../../utils/handleLocalstorage";

export type AuthState = {
  userInfo: boolean | string | null;
};

const initialState: AuthState = {
  userInfo: getFromLocalStorage("userInfo")
    ? JSON.parse(getFromLocalStorage("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state: AuthState, action: PayloadAction<boolean>): void {
      state.userInfo = action.payload;
      setToLocalStorage("userInfo", action.payload);
    },
  },
});

// export actions
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
