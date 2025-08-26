// src/store/slices/clientsSlice.js (unchanged, as provided)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Async thunk to fetch clients
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const querySnapshot = await getDocs(collection(db, 'clients'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Async thunk to add a client
export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
  const docRef = await addDoc(collection(db, 'clients'), clientData);
  return { id: docRef.id, ...clientData };
});

// Async thunk to update a client
export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, data }) => {
  const clientRef = doc(db, 'clients', id);
  await updateDoc(clientRef, data);
  return { id, ...data };
});

// Async thunk to delete a client
export const deleteClient = createAsyncThunk('clients/deleteClient', async (id) => {
  const clientRef = doc(db, 'clients', id);
  await deleteDoc(clientRef);
  return id;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex((client) => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = { ...state.clients[index], ...action.payload };
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((client) => client.id !== action.payload);
      });
  },
});

export default clientsSlice.reducer;
