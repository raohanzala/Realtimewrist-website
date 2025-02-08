import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { playSound } from "../../helpers";
import { assets } from "../../assets/assets";

const calculateTotalValue = (items) => {
  console.log('REMOVE FROM CART', items)
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

      console.log('IMADDTOCART', state.items, payload)
      if(Array.isArray(payload)){
        console.log('I am array Work')
        payload.map((items)=> {
          if(items.item){
            console.log(items, 'IMADDTOCART')
            state.items.push({...items.item, quantity: items.item.quantity })
          }
        })
      }else{
        const existingItem = state.items.find((item) => item._id === payload.itemId);

      if (existingItem) {
        existingItem.quantity += payload.quantity;
        playSound(assets.notification_sound);
      } else {
        state.items.push({ ...payload.item, quantity: payload.quantity });
        playSound(assets.notification_sound);
      }
    }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalValue = calculateTotalValue(state.items);
      state.isCartOpen = true;
    },
    removeFromCart: (state, { payload }) => {
      const removedItem = state.items.find(item => item._id === payload.itemId);
      if (removedItem) {
        state.totalItems -= removedItem.quantity;
      }
      state.items = state.items.filter(item => item._id !== payload.itemId);
      console.log('REMOVE FROM CART', state.items)
      state.totalValue = calculateTotalValue(state.items)
      console.log('REMOVE FROM CART', state.totalValue)

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
      playSound(assets.notification_sound);

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalValue = calculateTotalValue(state.items);

    },
    decrementQuantity: (state, { payload }) => {
      const existingItem = state.items.find((item) => item._id === payload.itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      playSound(assets.notification_sound);

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