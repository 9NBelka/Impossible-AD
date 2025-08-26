import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchTasks = createAsyncThunk('trelloTable/fetchTasks', async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const fetchUsers = createAsyncThunk('trelloTable/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name || doc.data().displayName || 'Unknown',
  }));
});

export const addTask = createAsyncThunk('trelloTable/addTask', async (newTask) => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    ...newTask,
    createdAt: serverTimestamp(),
  });
  const addedDoc = await getDoc(docRef);
  return { id: docRef.id, ...addedDoc.data() };
});

export const editTask = createAsyncThunk('trelloTable/editTask', async ({ taskId, updates }) => {
  await updateDoc(doc(db, 'tasks', taskId), updates);
  return { taskId, updates };
});

export const deleteTask = createAsyncThunk('trelloTable/deleteTask', async (taskId) => {
  await deleteDoc(doc(db, 'tasks', taskId));
  return taskId;
});

export const moveTask = createAsyncThunk('trelloTable/moveTask', async ({ taskId, newStatus }) => {
  await updateDoc(doc(db, 'tasks', taskId), { status: newStatus });
  return { taskId, newStatus };
});

export const reorderTasks = createAsyncThunk(
  'trelloTable/reorderTasks',
  async ({ columnId, updatedTasks }) => {
    const batch = updatedTasks.map(({ id, order }) => updateDoc(doc(db, 'tasks', id), { order }));
    await Promise.all(batch);
    return { columnId, updatedTasks };
  },
);

const trelloTableSlice = createSlice({
  name: 'trelloTable',
  initialState: {
    tasks: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload.updates };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          state.tasks[index].status = action.payload.newStatus;
        }
      })
      .addCase(reorderTasks.fulfilled, (state, action) => {
        const { updatedTasks } = action.payload;
        updatedTasks.forEach(({ id, order }) => {
          const index = state.tasks.findIndex((task) => task.id === id);
          if (index !== -1) {
            state.tasks[index].order = order;
          }
        });
      });
  },
});

export default trelloTableSlice.reducer;
