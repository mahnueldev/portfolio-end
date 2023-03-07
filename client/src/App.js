import React, { useEffect } from 'react';
import './App.css';
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
    <BrowserRouter>
      <Routes>
      {/* <Route path='/' element={ <Home /> } /> */}
      <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route path='/dashboard' element={ <Dashboard /> } />
      <Route path='/development' element={ <Development /> } />
      <Route path='/design' element={ <Design /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
