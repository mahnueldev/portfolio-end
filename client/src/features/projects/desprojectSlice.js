import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate} from '../hooks/axiosInstance';



// Fetch all des projects
export const getDesProjects = createAsyncThunk(
  'desproject/getDesProjects',
  async () => {
    const { data } = await axiosPrivate.get(`/desprojects`);
    return data;
  }
);


// Create a new des project
export const createDesProject = createAsyncThunk(
  'desproject/addDesProject',
  async ({ formData }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };
      const response = await axiosPrivate.post(`/desproject`, formData, config);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const deleteDesProjectById = createAsyncThunk(
  'desproject/deleteDesProjectById',
  async (id, thunkAPI) => {
    console.log('Deleting des project with ID:', id);
    try {
      await axiosPrivate.delete(`/desproject/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete all des projects
export const deleteAllDesProjects = createAsyncThunk(
  'desproject/deleteAllDesProjects',
  async () => {
    await axiosPrivate.delete(`/desprojects/`);
  }
);


export const updateDesProject = createAsyncThunk(
  'desproject/updateDesProject',
  async ({ id, formData }) => {
    console.log('Editing des project with ID:', id);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axiosPrivate.put(`/desproject/${id}`, formData, config);
      
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
        state.desproject = action.payload;
        console.log(state.desproject);
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
        state.desprojects = [];
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
// export const { existingData } = desprojectSlice.actions;
export default desprojectSlice.reducer;
