const initialState = {
  cart: []
};

export const SET_CART = "SET_CART";
export const CLEAR_CART = "CLEAR_CART";

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};

// Action creator for setting the cart
export const setMyCart = (cart) => ({
  type: SET_CART,
  payload: cart
});
// Action creator for clearing the cart
export const clearMyCart = () => ({
  type: CLEAR_CART
});
export default cartReducer;
