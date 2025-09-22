// New slice: src/store/slices/appointmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Async thunk to fetch appointments (optional, for admin views or fetching booked slots)
export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const querySnapshot = await getDocs(collection(db, 'appointments'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Async thunk to add an appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointmentData) => {
    const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
    return { id: docRef.id, ...appointmentData };
  },
);

// Async thunk to update an appointment (optional)
export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, data }) => {
    const apptRef = doc(db, 'appointments', id);
    await updateDoc(apptRef, data);
    return { id, ...data };
  },
);

// Async thunk to delete an appointment (optional)
export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (id) => {
  const apptRef = doc(db, 'appointments', id);
  await deleteDoc(apptRef);
  return id;
});

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex((appt) => appt.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = { ...state.appointments[index], ...action.payload };
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((appt) => appt.id !== action.payload);
      });
  },
});

export default appointmentsSlice.reducer;
