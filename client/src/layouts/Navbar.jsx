import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { topNav } from '../assets/data/nav-items';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, getUser } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import logo from '../assets/images/EEE192.png';

const { Header} = Layout;
const Navbar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <>
      {/* Top Nav start */}
      <Header className='flex items-center justify-between bg-blue-400 w-full  fixed  z-10'>
        <Menu theme='dark' mode='horizontal'>
          <div className='flex items-center justify-center'>
            <img src={logo} alt='' className='w-16 p-4 ' />
          </div>
          {topNav.map((item, i) => (
            <Menu.Item key={item.label} icon={collapsed ? item.icon : null}>
              <Link to={item.path}>
                {!collapsed &&
                  item.label.slice(0, 1).toUpperCase() + item.label.slice(1)}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <section className='flex justify-end items-center space-x-2'>
          {user && <p className='text-light-100 text-l'>WELCOME {user.name}</p>}
          <Button
            type='primary'
            htmlType='submit'
            className='bg-orange-300 mr-52'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </section>
      </Header>
      {/* Top Nav end */}
     
    </>
  );
};

export default Navbar;
