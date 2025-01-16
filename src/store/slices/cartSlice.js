import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpenCart : false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {  
      state.items.push(payload.item);

     const existingItem = state.items.find((item)=> item._id === payload.itemId)

     if(existingItem){
        existingItem.quantity += payload.quantity;
     }else{
      state.items.push({item : payload.item, quantity : payload.quantity})
     }
    },
    removeFromCart : (state, {payload}) =>{
      state.items = state.items.filter(item=> item._id !== payload.itemId)
    },
    clearCart : (state)=> {
      state.items = initialState.items
      state.isOpenCart = initialState.isOpenCart
    },
    incrementQuantity : (state, {payload})=> {
      const existingItem = state.items.find((item)=> item === payload.itemId)

      if(existingItem){
        state.items[existingItem].quantity += 1
      }
    },
    decrementQuantity : (state, {payload})=> {
      const existingItem = state.items.find((item)=> item === payload.itemId)

      if(existingItem){
        state.items[existingItem].quantity -= 1
      }
    },
    openCart : (state)=> {
      state.isOpenCart = true
    },
    closeCart : (state)=> {
      state.isOpenCart = false
    }
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
