import { v4 as uuidv4 } from 'uuid';

import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

const sideNav = [
  {
    id: uuidv4(),
    label: 'dashboard',
    icon: <DesktopOutlined />,
    to: '/',
  },
  {
    id: uuidv4(),
    label: 'development',
    icon: <PieChartOutlined />,
    to: '/development',
  },
  {
    id: uuidv4(),
    label: 'design',
    icon: <TeamOutlined/>,
    to: '/design',
  },
];
const topNav = [
  {
    id: uuidv4(),
    label: 'User',
    icon: <UserOutlined/>,
    to: '#',
  },
  {
    id: uuidv4(),
    label: 'Calender',
    icon: <UserOutlined />,
    to: '#',
  },
  
];

export { sideNav, topNav };
