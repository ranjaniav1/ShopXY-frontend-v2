// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  user: null, // No user is logged in initially
  isAuthenticated: false // User is not authenticated initially
};

// Create the user slice
const userSlice = createSlice({
  name: "user", // The name of the slice
  initialState, // Initial state
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
      state.isAuthenticated = true; // Set the user as authenticated
    },

    // Action to log out user
    logout: (state) => {
      state.user = null; // Clear the user data
      state.isAuthenticated = false; // Set user as unauthenticated
    }
  }
});

// Export actions to use them in components or middleware
export const { setUser, logout } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
