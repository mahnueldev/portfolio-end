import React, { useState} from 'react';
import { sideNav} from '../assets/data/nav-items';
import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
import '../custom-theme.css';
import { useSelector } from 'react-redux';


const { Sider } = Layout;



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const filteredNavItems = sideNav.filter((item) => {
    return item.roles.includes(user.role);
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className='bg-blue-400'
    >
      <div style={{ position: 'fixed', left: 20, top: 100, bottom: 0 }}>
        <Menu>
          {filteredNavItems.map((item, i) => (
            <Menu.Item key={item.label} icon={collapsed ? item.icon : null}>
              <Link to={item.path}>
                {!collapsed && item.label.slice(0, 1).toUpperCase() + item.label.slice(1)}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;