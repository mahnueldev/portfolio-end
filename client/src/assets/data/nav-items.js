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
    path: '/',
    roles: ['admin','user']
  },
  {
    id: uuidv4(),
    label: 'development',
    icon: <PieChartOutlined />,
    path: '/development',
    roles: ['admin','user']
  },
  {
    id: uuidv4(),
    label: 'design',
    icon: <TeamOutlined/>,
    path: '/design',
    roles: ['admin']
  },
];
const topNav = [
  {
    id: uuidv4(),
    label: 'profile',
    icon: <UserOutlined/>,
    path: '/profile',
  },
  {
    id: uuidv4(),
    label: 'certifications',
    icon: <UserOutlined />,
    path: '/certifications',
  },
  
];

export { sideNav, topNav };
