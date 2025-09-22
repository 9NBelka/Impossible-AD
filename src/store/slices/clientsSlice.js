import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Async thunk to fetch clients
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
});

// Async thunk to add a client
export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
  try {
    const sanitizedData = {
      name: clientData.name || '',
      email: clientData.email || '',
      status: clientData.status || 'В процессе',
      dateCreate: clientData.dateCreate || new Date().toISOString(),
      plan: clientData.plan || '',
      website: clientData.website || '',
      instagram: clientData.instagram || '',
      facebook: clientData.facebook || '',
      city: clientData.city || '',
      phone: clientData.phone || '',
      payments: clientData.payments || [],
    };
    const docRef = await addDoc(collection(db, 'clients'), sanitizedData);
    return { id: docRef.id, ...sanitizedData };
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
});

// Async thunk to update a client
export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, data }) => {
  try {
    const clientRef = doc(db, 'clients', id);
    const sanitizedData = {
      name: data.name || '',
      email: data.email || '',
      status: data.status || 'В процессе',
      dateCreate: data.dateCreate || new Date().toISOString(),
      plan: data.plan || '',
      website: data.website || '',
      instagram: data.instagram || '',
      facebook: data.facebook || '',
      city: data.city || '',
      phone: data.phone || '',
      payments: data.payments || [],
    };
    await updateDoc(clientRef, sanitizedData);
    return { id, ...sanitizedData };
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
});

// Async thunk to delete a client
export const deleteClient = createAsyncThunk('clients/deleteClient', async (id) => {
  try {
    const clientRef = doc(db, 'clients', id);
    await deleteDoc(clientRef);
    return id;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
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
      .addCase(addClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex((client) => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = { ...state.clients[index], ...action.payload };
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((client) => client.id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientsSlice.reducer;
