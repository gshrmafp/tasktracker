// UI slice for modals, notifications, etc.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  modalType: null,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, action) {
      state.showModal = true;
      state.modalType = action.payload;
    },
    closeModal(state) {
      state.showModal = false;
      state.modalType = null;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { openModal, closeModal, setNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
