import { createSlice } from "@reduxjs/toolkit";

const calculateTotalValue = (items) => {
  return items.reduce((accumulator, item) => accumulator + item.newPrice * item.quantity, 0);
};

const initialState = {
  items: [],
  isCartOpen: false,
  totalItems : 0,
  totalValue : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {  
      console.log(payload)
      const existingItem = state.items.find((item) => item._id === payload.itemId);

      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.items.push({ ...payload.item, quantity: payload.quantity });
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalValue = calculateTotalValue(state.items);


    },
    removeFromCart: (state, { payload }) => {
      const removedItem = state.items.find(item => item._id === payload.itemId);
      if (removedItem) {
        state.totalItems -= removedItem.quantity;
      }
      state.items = state.items.filter(item => item._id !== payload.itemId);
      state.totalValue = calculateTotalValue(state.items)

    },
    clearCart: (state) => {
      state.items = [];
      state.isCartOpen = false;
      state.totalItems = 0
      state.totalValue = 0
    },
    incrementQuantity: (state, { payload }) => {
      const existingItem = state.items.find((item) => item._id === payload.itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalValue = calculateTotalValue(state.items);

    },
    decrementQuantity: (state, { payload }) => {
      const existingItem = state.items.find((item) => item._id === payload.itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter(item => item._id !== payload.itemId);
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalValue = calculateTotalValue(state.items);

    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    }
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;