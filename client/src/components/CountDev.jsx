import React, { useEffect } from 'react';
import { getDevProjects } from '../features/projects/devprojectSlice';
import { useDispatch, useSelector } from 'react-redux';

const CountDev = () => {
  const { devprojects } = useSelector((state) => state.devprojects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDevProjects());
  }, [dispatch]);

  return (
    <div className='flex flex-col justify-center items-center border w-1/6  p-4 rounded-3xl'>
      <p>Development projects</p>
      <h1 className='text-green-300 text-5xl'>{devprojects.length}</h1>
    </div>
  );
};

export default CountDev;
