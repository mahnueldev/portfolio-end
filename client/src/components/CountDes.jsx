import React, { useEffect } from 'react';
import { getDesProjects } from '../features/projects/desprojectSlice';
import { useDispatch, useSelector } from 'react-redux';

const CountDes = () => {
  const { desprojects } = useSelector((state) => state.desprojects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDesProjects());
  }, [dispatch]);

  return (
    <div className='flex flex-col justify-center items-center border w-1/6 p-4 rounded-3xl'>
      <p>Design projects</p>
      <h1 className='text-orange-300 text-5xl'>{desprojects.length}</h1>
    </div>
  );
};

export default CountDes;
