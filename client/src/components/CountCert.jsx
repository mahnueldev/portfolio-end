import React, { useEffect } from 'react';
import { getCerts } from '../features/certs/certSlice';
import { useDispatch, useSelector } from 'react-redux';

const CountCert = () => {
  const { certs } = useSelector((state) => state.certs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCerts());
  }, [dispatch]);

  return (
    <div className='flex flex-col justify-center items-center border w-1/6 p-4 rounded-3xl'>
      <p>Certifications</p>
      <h1 className='text-orange-300 text-5xl'>{certs.length}</h1>
    </div>
  );
};

export default CountCert;
