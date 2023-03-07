import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {sideNav, topNav} from '../assets/data/nav-items'
import logo from '../assets/images/EEE192.png'
import { Dashboard, Development, Design } from '../layouts';

const { Header, Content, Footer, Sider } = Layout;


const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onMenuSelect = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Dashboard':
        console.log("Rendered Component: Dashboard");
        return <Dashboard />;
      case 'Development':
        console.log("Rendered Component: Development");
        return <Development />;
      case 'Design':
        console.log("Rendered Component: Design");
        return <Design />;
      default:
        return 'null';
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
       <div className='flex items-center justify-center'>
        <img src={logo} alt='' className='w-16 p-4 '/></div>
        <Menu theme="dark" selectedKeys={['dashboard']} mode="inline" onSelect={onMenuSelect}>
          {sideNav.map((item, i) => (
            <Menu.Item key={item.label}>
              {item.icon} {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} >
        
        
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={topNav} />
       
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
         
            <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>{renderContent()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
