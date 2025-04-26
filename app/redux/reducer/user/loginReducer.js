// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

// Create the user slice
const userSlice = createSlice({
  name: "user", // The name of the slice
  initialState, // Initial state
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // Action to log out user
    RemoveUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    }
  }
});

// Export actions to use them in components or middleware
export const { setUser, RemoveUser } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
