import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const deleteDevProjectById = createAsyncThunk(
  'devprojects/deleteDevProjectById',
  async (id, thunkAPI) => {
    console.log('Deleting dev project with ID:', id);
    try {
      await axios.delete(`${url}/api/devprojects/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
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
// export const updateDevProject = createAsyncThunk(
//   'devprojects/updateDevProject',
//   async (devproject) => {
//     const { data } = await axios.put(
//       `${url}/api/devprojects/${devproject.id}`,
//       devproject
//     );
//     return data;
//   }
// );
export const updateDevProject = createAsyncThunk(
  'devprojects/updateDevProject',
  async ({ id, formData }) => {
    console.log('Editing dev project with ID:', id);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.put(`${url}/api/devprojects/${id}`, formData, config);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const clearField = createAction('devproject/clearField');
export const devprojectSlice = createSlice({
  name: 'devprojects',
  initialState: {
    devprojects: [],
    devproject: null,
    loading: false,
    error: null,
    
  },
  reducers: {
    clearField: (state) => {
      state.devproject = null;
    },
   
  },
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
        state.devproject = action.payload;
        console.log(state.devproject);
      })
      .addCase(createDevProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(deleteDevProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDevProjectById.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        state.devprojects = state.devprojects.filter(
          (devproject) => devproject.id !== id
        );
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
        state.loading = false;
        console.log('action', action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.devprojects = state.devprojects.map((devproject) =>
            devproject.id === id ? action.payload : devproject
          );
        }
      })
       .addCase(updateDevProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
    
  },
});
// export const { existingData } = devprojectSlice.actions;
export default devprojectSlice.reducer;
