const initialState = {
  cart: [],
  totalProductActualPrice: 0,
  totalDiscount: 0,
  finalPrice: 0
};

export const SET_CART = "SET_CART";

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        ...action.payload
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

export default cartReducer;
