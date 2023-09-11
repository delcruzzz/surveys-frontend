import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type Notification = {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

type UiState = {
  notifications: Notification[];
}

export const initialState: UiState = {
  notifications: [],
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Notification>) {
      const newNotification = action.payload;
      state.notifications = [...state.notifications, newNotification];

      toast(newNotification.message, {
        type: newNotification.variant,
      })
    }
  },
});

export const {
  addMessage
} = uiSlice.actions;
