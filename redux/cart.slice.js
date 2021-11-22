import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: [],
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
        const index = state.findIndex(cart=>cart.id === action.payload.id);
        if(index >= 0) {
            state[index]?.quantity++;
        } else{
 state.push({...action.payload,quantity:1});
        }
       
    },
    removeItemFromCart: (state, action) => {
      return state;
    },
    incrementItemQuantityInCart: (state, action) => {
      const index = state.findIndex(cart=>cart.id === action.payload.id);
        if(index >= 0) {
            state[index]?.quantity++;
        }
    },
    decrementItemQuantityInCart: (state, action) => {
      const index = state.findIndex(cart=>cart.id === action.payload.id);
        if(index > 0) {
            state[index]?.quantity--;
        }
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  decrementItemQuantityInCart,
  incrementItemQuantityInCart,
  removeItemFromCart,
} = cartSlice.actions;
