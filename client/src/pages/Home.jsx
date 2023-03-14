import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { sideNav, topNav } from '../assets/data/nav-items';
import logo from '../assets/images/EEE192.png';
import { Dashboard, Development, Design } from '../layouts';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
  };

  const onMenuSelect = ({ key }) => {
    setSelectedMenuItem(key);
    localStorage.setItem('selectedMenuItem', key); // add this line
  };

  useEffect(() => {
    const storedSelectedMenuItem = localStorage.getItem('selectedMenuItem');
    if (storedSelectedMenuItem) {
      setSelectedMenuItem(storedSelectedMenuItem);
    }
  }, []);

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'dashboard':
        console.log('Rendered Component: Dashboard');
        return <Dashboard />;
      case 'development':
        console.log('Rendered Component: Development');
        return <Development />;
      case 'design':
        console.log('Rendered Component: Design');
        return <Design />;
      default:
        return 'null';
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}>
          <div className='flex items-center justify-center'>
            <img src={logo} alt='' className='w-16 p-4 ' />
          </div>
          <Menu
            theme='dark'
            selectedKeys={[selectedMenuItem]}
            mode='inline'
            onSelect={onMenuSelect}
          >
            {sideNav.map((item, i) => (
              <Menu.Item key={item.label} icon={collapsed ? item.icon : null}>
                <Link to={item.path}>
                  {!collapsed &&
                    item.label.slice(0, 1).toUpperCase() + item.label.slice(1)}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='flex items-center bg-blue-400 w-full space-x-80'
          style={{
            padding: 0,

            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}
        >
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            items={topNav}
          />
          <Button
            type='primary'
            htmlType='submit'
            className='bg-orange-300'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: '80px 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Mahnuel Portfolio ©2023 Created by Mahnuel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
