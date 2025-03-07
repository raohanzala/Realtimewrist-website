import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasSeenModal: false, // Track if user has disabled modal
  isOpen: false, // Track modal visibility
};

export const whatsappModalSlice = createSlice({
  name: "whatsApp",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isOpen = true;
    },
    hideModal: (state) => {
      state.isOpen = false;
    },
    setHasSeenModal: (state) => {
      state.hasSeenModal = true;
    },
  },
});

export const { showModal, hideModal, setHasSeenModal } = whatsappModalSlice.actions;
export default whatsappModalSlice.reducer;
