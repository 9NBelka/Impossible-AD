// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

// Регистрация
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        role: 'client',
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Логин
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      let userData;
      if (userDoc.exists()) {
        userData = userDoc.data();
        if (!['admin', 'moderator'].includes(userData.role)) {
          throw new Error('Недостаточно прав для входа');
        }
      } else {
        userData = {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          role: 'client',
        };
        await setDoc(userDocRef, userData);
      }
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Проверка состояния при загрузке приложения
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Вернём Promise — он разрешится после первого срабатывания onAuthStateChanged
      return await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          // Отпишемся — нам нужна только инициализация при старте
          unsubscribe();

          if (firebaseUser) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              if (!['admin', 'moderator'].includes(userData.role)) {
                dispatch(clearUser());
                return resolve(null);
              }
              dispatch(setUser(userData));
              return resolve(userData);
            } else {
              const newUserData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                createdAt: new Date().toISOString(),
                role: 'client',
              };
              await setDoc(userDocRef, newUserData);
              dispatch(setUser(newUserData));
              return resolve(newUserData);
            }
          } else {
            dispatch(clearUser());
            return resolve(null);
          }
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: null,
  loading: true, // <- ВАЖНО: по умолчанию true, чтобы не редиректить раньше времени
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // checkAuthState
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthState.fulfilled, (state) => {
        // setUser уже диспатчится внутри thunk'а, здесь просто снимаем флаг loading
        state.loading = false;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;
