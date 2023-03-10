import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import devprojectReducer from './features/devproject/devprojectSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        devprojects: devprojectReducer,
        devproject: devprojectReducer,
      },
})