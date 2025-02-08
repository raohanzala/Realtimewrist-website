import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: null, 
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = null;
    },
  },
});

export const { saveFormData, clearFormData } = orderSlice.actions;
export default orderSlice.reducer;