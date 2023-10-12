import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import devprojectReducer from './features/projects/devprojectSlice';
import desprojectReducer from './features/projects/desprojectSlice';
import certReducer from './features/certs/certSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        devprojects: devprojectReducer,
        desprojects: desprojectReducer,
        certs: certReducer,
      },
})