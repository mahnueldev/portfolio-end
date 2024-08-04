import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { axiosPrivate} from '../hooks/axiosInstance';

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosPrivate.post(`/register`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      
      const response = await axiosPrivate.post(`/auth`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (credentials, thunkAPI) => {
    try {
      
      const response = await axiosPrivate.get(`/user`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearError = createAction('auth/clearError');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('token') || null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      setAuthToken(action.payload.token);
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.msg : action.error.message;
    })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setAuthToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
       // getUser
       .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
        state.user =localStorage.removeItem('token');
      })
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
