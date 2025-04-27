import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  isAuthenticated: false, // Tracks whether the user is logged in or not
  user: {}, // Stores the user data
};

// Create the user slice
const userSlice = createSlice({
  name: "user", // The name of the slice
  initialState, // Initial state
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
      state.isAuthenticated = true; // Set authenticated status to true
      state.user = { user: action.payload };  // Store the user data (from the payload)
    },

    // Action to log out user
    RemoveUser: (state) => {
      state.isAuthenticated = false; // Set authenticated status to false
      state.user = {}; // Clear user data
    }
  }
});

// Export actions to use them in components or middleware
export const { setUser, RemoveUser } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
