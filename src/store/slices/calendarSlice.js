import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchAvailableSlots = createAsyncThunk(
  'calendar/fetchAvailableSlots',
  async (_, { rejectWithValue }) => {
    try {
      const q = collection(db, 'calendarSlots');
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return { id: null, slots: [] };
      }
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data() || {};
      return { id: docSnap.id, slots: data.slots || [] };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch calendar slots');
    }
  },
);

export const saveAvailableSlots = createAsyncThunk(
  'calendar/saveAvailableSlots',
  async (slots, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const existingDocId = state.calendar.availableSlots?.id || null;

      if (existingDocId) {
        const docRef = doc(db, 'calendarSlots', existingDocId);
        await updateDoc(docRef, { slots });
        return { id: existingDocId, slots };
      } else {
        const colRef = collection(db, 'calendarSlots');
        const docRef = await addDoc(colRef, { slots });
        return { id: docRef.id, slots };
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to save calendar slots');
    }
  },
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    availableSlots: { id: null, slots: [] }, // теперь объект
    status: 'idle',
    error: null,
  },
  reducers: {
    updateAvailableSlots: (state, action) => {
      // action.payload — массив слотов [{day, hour}, ...]
      state.availableSlots = {
        ...state.availableSlots,
        slots: action.payload,
      };
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableSlots = action.payload; // { id, slots }
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(saveAvailableSlots.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveAvailableSlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableSlots = action.payload; // { id, slots }
      })
      .addCase(saveAvailableSlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateAvailableSlots, setStatus, setError } = calendarSlice.actions;
export default calendarSlice.reducer;
