// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../store/slices/clientsSlice';
import authReducer from '../store/slices/authSlice';
import trelloTableSlice from './slices/trelloTableSlicee';
import contactFormReducer from './slices/contactFormSlice';
import calendarSlice from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    auth: authReducer,
    trelloTable: trelloTableSlice,
    contactForm: contactFormReducer,
    calendar: calendarSlice,
  },
});

export default store;
