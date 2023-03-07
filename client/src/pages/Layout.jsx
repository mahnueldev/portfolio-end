import { Button } from 'antd'
import React, {useEffect} from 'react'
import {  } from '../components'
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <section>
        Hello this is home
        <Button type="primary" htmlType="submit" className="bg-blue-600" onClick={handleLogout}>
          Logout
        </Button>
    </section>
  )
}

export default Home