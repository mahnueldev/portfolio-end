import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8080';
// const url = 'https://api.mahnuel.com';

// Fetch all cert projects
export const getCerts = createAsyncThunk(
  'cert/getCerts',
  async () => {
    const { data } = await axios.get(`${url}/api/cert/`);
    return data;
  }
);


// Create a new cert
export const newCert = createAsyncThunk(
  'cert/addDesProject',
  async ({ formData }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };
      const response = await axios.post(`${url}/api/cert`, formData, config);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const deleteCertById = createAsyncThunk(
  'cert/deleteCertById',
  async (id, thunkAPI) => {
    console.log('Deleting cert with ID:', id);
    try {
      await axios.delete(`${url}/api/cert/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete all cert projects
export const deleteAllCerts = createAsyncThunk(
  'cert/deleteAllCerts',
  async () => {
    await axios.delete(`${url}/api/cert/`);
  }
);


export const updateCert = createAsyncThunk(
  'cert/updateCert',
  async ({ id, formData }) => {
    console.log('Editing cert with ID:', id);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.put(`${url}/api/cert/${id}`, formData, config);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const clearField = createAction('cert/clearField');
export const certSlice = createSlice({
  name: 'certs',
  initialState: {
    certs: [],
    cert: null,
    loading: false,
    error: null,
    
  },
  reducers: {
    clearField: (state) => {
      state.cert = null;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCerts.fulfilled, (state, action) => {
        state.certs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })

      .addCase(newCert.pending, (state) => {
        state.loading = true;
      })
      .addCase(newCert.fulfilled, (state, action) => {
        state.loading = false;
        state.cert = action.payload;
        console.log(state.cert);
      })
      .addCase(newCert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(deleteCertById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCertById.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        state.certs = state.certs.filter(
          (cert) => cert.id !== id
        );
        state.error = null;
      })
      .addCase(deleteCertById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })

      .addCase(deleteAllCerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCerts.fulfilled, (state) => {
        state.certs = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAllCerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      .addCase(updateCert.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCert.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action', action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.certs = state.certs.map((cert) =>
            cert.id === id ? action.payload : cert
          );
        }
      })
       .addCase(updateCert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
    
  },
});
// export const { existingData } = certSlice.actions;
export default certSlice.reducer;
