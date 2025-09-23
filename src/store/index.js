// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../store/slices/clientsSlice';
import authReducer from '../store/slices/authSlice';
import trelloTableSlice from './slices/trelloTableSlicee';
import contactFormReducer from './slices/contactFormSlice';
import calendarSlice from './slices/calendarSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    auth: authReducer,
    trelloTable: trelloTableSlice,
    contactForm: contactFormReducer,
    calendar: calendarSlice,
    appointments: appointmentsReducer,
  },
});

export default store;
