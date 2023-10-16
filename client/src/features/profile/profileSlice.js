import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../hooks/axiosInstance';

export const createOrUpdateProfile = createAsyncThunk(
    'profile/createOrUpdateProfile',
    async ({ about }, thunkAPI) => { // Change the parameter to accept an object with 'about'
      try {
        const response = await axiosPrivate.post(`/profile`, { about });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/profile`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: "",
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createOrUpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createOrUpdateProfile.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
        
      })
    //   >>>>>>>>>>>>>>>>>>>>>>>>>>
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
       
      });
  },
});

export default profileSlice.reducer;
