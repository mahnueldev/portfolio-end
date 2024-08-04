import React, { useEffect } from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/auth/authSlice';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Register, Development, Design, Dashboard, Certifications, Profile } from './pages/index';
import { AppLayout } from './layouts/index';
import '../src/tailwind.css';

const ROLES = {
  'User': 'user',
  'Admin': 'admin'
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'hsl(185,69%,54%)',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={user ? <AppLayout /> : <Navigate to='/login' />}
          >
            <Route index element={<Dashboard />} />
            <Route path='/development' element={<Development />} />
            <Route path='/design' element={user?.role === ROLES.Admin ? <Design /> : <Navigate to='/' />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/certifications' element={<Certifications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
