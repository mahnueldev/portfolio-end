import React from 'react';
import { SignUp } from '../components';
import pattrn from '../../src/assets/svg/bgmah.svg';

const RegisterUser = () => {
  return (
    <section className='flex  items-center space-x-26 '>
      <img src={pattrn} alt='' className='xl:block   xl: h-screen sm:hidden ' />
      <div className='xl:block md:block w-full sm:w-4/6  sm:mt-20 sm:ml-20'>
        <SignUp />
      </div>
    </section>
  );
};

export default RegisterUser;
