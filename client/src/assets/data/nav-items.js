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
    label: 'Profile',
    icon: <UserOutlined/>,
    to: '/profile',
  },
  {
    id: uuidv4(),
    label: 'Certifications',
    icon: <UserOutlined />,
    to: '/certifications',
  },
  
];

export { sideNav, topNav };
