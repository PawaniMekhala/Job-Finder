// import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "./store";
// import { users } from "../utils/data";

// const initialState = {
//   user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? users[1],
// };

// const userSlice = createSlice({
//   name: "userInfo",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.user = action.payload.user;
//     },
//     logout(state) {
//       state.user = null;
//       localStorage?.removeItem("userInfo");
//     },
//   },
// });

// export default userSlice.reducer;

// export function Login(user) {
//   return (dispatch, getState) => {
//     dispatch(userSlice.actions.login(user));
//   };
// }

// export function Logout() {
//   return (dispatch, getState) => {
//     dispatch(userSlice.actions.logout());
//   };
// }



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("userInfo")) || null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;

export const Login = (user) => (dispatch) => {
  dispatch(login(user));
};

export const Logout = () => (dispatch) => {
  dispatch(logout());
};
