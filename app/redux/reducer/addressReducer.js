const initialState = {
  data: []
};

export const SET_ADDRESS = "SET_ADDRESS";

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state, // Keep the other properties of the state intact
        data: [...action.payload] // Replace the data with the new payload (array of addresses)
      };

    default:
      return state;
  }
};

// Action creator for setting the cart
export const setMyAddress = (data) => ({
  type: SET_ADDRESS,
  payload: data
});

export default addressReducer;
