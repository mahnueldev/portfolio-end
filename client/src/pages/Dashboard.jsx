import React from 'react';
import { CountDev, CountDes, CountCert } from '../components';
import { useSelector } from 'react-redux';

const ROLES = {
  User: 'user',
  Admin: 'admin',
};

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  console.log('User from state:', user);
  return (
    <section className='flex justify-center space-x-24'>
      <CountDev />
      {user?.role === ROLES.Admin && <CountDes />}
      <CountCert />
    </section>
  );
};

export default Dashboard;
