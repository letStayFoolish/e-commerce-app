import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../../../utils";
import { type AuthState } from "./types";
import { type IUser } from "../../../types";

const initialState: AuthState = {
  userInfo: getFromLocalStorage("userInfo")
    ? getFromLocalStorage("userInfo") // already parsed with in it
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
      state.userInfo = null;
      sessionStorage.clear();
      localStorage.clear();
    },
  },
});

// export actions
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
