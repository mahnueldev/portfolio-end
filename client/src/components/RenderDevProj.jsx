import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDevProjects,
  deleteDevProjectById,
} from '../features/devproject/devprojectSlice';
import ImageComponent from './ImageComponent';

const RenderDevProj = () => {
  const dispatch = useDispatch();
  const { devprojects } = useSelector((state) => state.devprojects);
  useEffect(() => {
    dispatch(getDevProjects());
  }, [dispatch]);

  const handleDeleteId = (id) => {
    dispatch(deleteDevProjectById(id))
      .then((result) => {
        // handle success
        console.log(result);
      })
      .catch((error) => {
        // handle error
        console.log('problem deleting');
      });
  };
  const sortedProjects = [...devprojects].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <section className='grid grid-cols-3 '>
    {sortedProjects.map((project) => {
      return (
        <ImageComponent
          key={project.id}
          src={project.url}
          name={project.name}
          alt={project.filename}
          remove={handleDeleteId}
        />
      );
    })}
  </section>
  );
};

export default RenderDevProj;
