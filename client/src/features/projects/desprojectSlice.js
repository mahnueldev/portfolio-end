import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8080';

// Fetch all dev projects
export const getDesProjects = createAsyncThunk(
  'desprojects/getDesProjects',
  async () => {
    const { data } = await axios.get(`${url}/api/desprojects/`);
    return data;
  }
);


// Create a new dev project
export const createDesProject = createAsyncThunk(
  'desprojects/addDesProject',
  async ({ formData, config }) => {
    const { data } = await axios.post(
      `${url}/api/desprojects`,
      formData,
      config
    );
    return data;
  }
);

export const deleteDesProjectById = createAsyncThunk(
  'desprojects/deleteDesProjectById',
  async (id, thunkAPI) => {
    console.log('Deleting des project with ID:', id);
    try {
      await axios.delete(`${url}/api/desprojects/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete all dev projects
export const deleteAllDesProjects = createAsyncThunk(
  'desprojects/deleteAllDesProjects',
  async () => {
    await axios.delete(`${url}/api/desprojects/`);
  }
);


export const updateDesProject = createAsyncThunk(
  'desprojects/updateDevProject',
  async ({ id, formData }) => {
    console.log('Editing des project with ID:', id);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.put(`${url}/api/desprojects/${id}`, formData, config);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const clearField = createAction('desproject/clearField');
export const desprojectSlice = createSlice({
  name: 'desprojects',
  initialState: {
    desprojects: [],
    desproject: null,
    loading: false,
    error: null,
    
  },
  reducers: {
    clearField: (state) => {
      state.desproject = null;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDesProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesProjects.fulfilled, (state, action) => {
        state.desprojects = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getDesProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })

      .addCase(createDesProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDesProject.fulfilled, (state, action) => {
        state.loading = false;
        state.devproject = action.payload;
        console.log(state.devproject);
      })
      .addCase(createDesProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(deleteDesProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDesProjectById.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        state.desprojects = state.desprojects.filter(
          (desproject) => desproject.id !== id
        );
        state.error = null;
      })
      .addCase(deleteDesProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })

      .addCase(deleteAllDesProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllDesProjects.fulfilled, (state) => {
        state.devprojects = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAllDesProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(updateDesProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDesProject.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action', action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.desprojects = state.desprojects.map((desproject) =>
            desproject.id === id ? action.payload : desproject
          );
        }
      })
       .addCase(updateDesProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
    
  },
});
// export const { existingData } = devprojectSlice.actions;
export default desprojectSlice.reducer;
