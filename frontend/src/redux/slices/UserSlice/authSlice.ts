import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../../utils/handleLocalStorage";
import { type AuthState } from "./types";
import { type IUser } from "../../../types";

const initialState: AuthState = {
  userInfo: getFromLocalStorage("userInfo")
    ? JSON.parse(getFromLocalStorage("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state: AuthState, action: PayloadAction<IUser>): void {
      state.userInfo = action.payload;
      setToLocalStorage("userInfo", action.payload); // already includes JSON.stringify()
    },

    logout(state: AuthState) {
      (state.userInfo = null), localStorage.removeItem("userInfo");
    },
  },
});

// export actions
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
