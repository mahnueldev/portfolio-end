import React from 'react';
import { SignIn } from '../components';
import pattrn from '../../src/assets/svg/bgmah.svg';

const Login = () => {
  return (
    <section className='flex  items-center space-x-26 '>
      <img src={pattrn} alt='' className='xl:block   xl: h-screen sm:hidden ' />
      <div className='xl:block md:block w-full sm:w-4/6  sm:mt-20 sm:ml-20'>
        <SignIn />
      </div>
    </section>
  );
};

export default Login;
