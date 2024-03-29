import React, { useEffect } from 'react';
import './App.css';
import {  ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/auth/authSlice';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Login} from './pages/index';
import {  Development, Design, Dashboard } from './layouts/index';
import '../src/tailwind.css';

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
      {/* <Route path='/' element={ <Home /> } /> */}
      <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route exact path='/dashboard' element={ <Dashboard /> } />
      <Route exact path='/development' element={ <Development /> } />
      <Route exact path='/design' element={ <Design /> } />
      </Routes>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
