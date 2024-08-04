import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Bottombar from './Bottombar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Main = () => {
  return (
    <Layout className='flex flex-col min-h-screen'>
      <Navbar />
      <Layout>
        <Sidebar />
        <Layout className='flex-1 flex flex-col'>
          <Content className='flex-1 px-10 py-32 min-h-screen'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Bottombar />
    </Layout>
  );
};

export default Main;
