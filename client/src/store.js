import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import devprojectReducer from './features/projects/devprojectSlice';
import desprojectReducer from './features/projects/desprojectSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        devprojects: devprojectReducer,
        desprojects: desprojectReducer,
      },
})