// src/store/slices/contactFormSlice.js (new slice)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Async thunk to fetch contact forms (optional, but included for completeness)
export const fetchContactForms = createAsyncThunk('contactForm/fetchContactForms', async () => {
  const querySnapshot = await getDocs(collection(db, 'contactform'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Async thunk to add a contact form entry
export const addContactForm = createAsyncThunk('contactForm/addContactForm', async (formData) => {
  const docRef = await addDoc(collection(db, 'contactform'), formData);
  return { id: docRef.id, ...formData };
});

// Async thunk to update a contact form entry (optional)
export const updateContactForm = createAsyncThunk(
  'contactForm/updateContactForm',
  async ({ id, data }) => {
    const formRef = doc(db, 'contactform', id);
    await updateDoc(formRef, data);
    return { id, ...data };
  },
);

// Async thunk to delete a contact form entry (optional)
export const deleteContactForm = createAsyncThunk('contactForm/deleteContactForm', async (id) => {
  const formRef = doc(db, 'contactform', id);
  await deleteDoc(formRef);
  return id;
});

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: {
    forms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactForms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactForms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forms = action.payload;
      })
      .addCase(fetchContactForms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactForm.fulfilled, (state, action) => {
        state.forms.push(action.payload);
      })
      .addCase(updateContactForm.fulfilled, (state, action) => {
        const index = state.forms.findIndex((form) => form.id === action.payload.id);
        if (index !== -1) {
          state.forms[index] = { ...state.forms[index], ...action.payload };
        }
      })
      .addCase(deleteContactForm.fulfilled, (state, action) => {
        state.forms = state.forms.filter((form) => form.id !== action.payload);
      });
  },
});

export default contactFormSlice.reducer;
