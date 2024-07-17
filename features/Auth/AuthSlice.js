import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: null,
      token: null,
      localId: null,
      imageCamera: null,
      isAuthenticated: false,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value.user = payload.email;
      state.value.token = payload.idToken;
      state.value.localId = payload.localId;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.token = null;
      state.value.localId = null;
    },
    setCameraImage: (state, { payload }) => {
      state.value.imageCamera = payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.value.isAuthenticated = payload;
    },
  },
});

export const { setUser, clearUser, setCameraImage, setIsAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
