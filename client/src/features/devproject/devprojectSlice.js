import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8080';

// Fetch all dev projects
export const getDevProjects = createAsyncThunk(
  'devprojects/getDevProjects',
  async () => {
    const { data } = await axios.get(`${url}/api/devprojects/`);
    return data;
  }
);

// Create a new dev project
export const createDevProject = createAsyncThunk(
    'devprojects/addDevProject',
    async ({ formData, config }) => {
      const { data } = await axios.post(
        `${url}/api/devprojects`,
        formData,
        config
      );
      return data;
    }
  );
// Delete a dev project by id
export const deleteDevProjectById = createAsyncThunk(
  'devprojects/deleteDevProjectById',
  async (id) => {
    await axios.delete(`${url}/api/devprojects/${id}`);
    return id;
  }
);

// Delete all dev projects
export const deleteAllDevProjects = createAsyncThunk(
  'devprojects/deleteAllDevProjects',
  async () => {
    await axios.delete(`${url}/api/devprojects/`);
  }
);

// Update a dev project
export const updateDevProject = createAsyncThunk(
  'devprojects/updateDevProject',
  async (devproject) => {
    const { data } = await axios.put(
      `${url}/api/devprojects/${devproject.id}`,
      devproject
    );
    return data;
  }
);

export const devprojectSlice = createSlice({
  name: 'devprojects',
  initialState: {
    devprojects: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDevProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDevProjects.fulfilled, (state, action) => {
        state.devprojects = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getDevProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })

      .addCase(createDevProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDevProject.fulfilled, (state, action) => {
        state.loading = false;
        state.devprojects = action.payload;
        console.log(state.devprojects);
      })
      .addCase(createDevProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(deleteDevProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDevProjectById.fulfilled, (state, action) => {
        state.devprojects = state.devprojects.filter(
          (devproject) => devproject.id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDevProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(deleteAllDevProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllDevProjects.fulfilled, (state) => {
        state.devprojects = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAllDevProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(updateDevProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDevProject.fulfilled, (state, action) => {
        const index = state.devprojects.findIndex(
          (devproject) => devproject.id === action.payload.id
        );
        if (index !== -1) {
          state.devprojects[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateDevProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      });
  },
});

export default devprojectSlice.reducer;