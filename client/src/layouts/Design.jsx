import React, { useState } from 'react';
import { CreateDesForm } from '../components';
import RenderDesProj from '../components/RenderDesProj';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllDesProjects } from '../features/projects/desprojectSlice';
import { Form, Button, Modal } from 'antd';

const Design = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const dispatch = useDispatch();
  const { desprojects,loading } = useSelector((state) => state.desprojects);
  const handleDeleteConfirm = () => {
    dispatch(deleteAllDesProjects());
    setShowDeleteModal(false);
  }
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  }
  return (
    <section className='flex justify-between '>
      <div className='w-5/6'>
        <CreateDesForm />
      </div>
      <div className='w-5/6 flex flex-col items-center overflow-y-auto h-screen '>
        <RenderDesProj />
        {desprojects.length > 0 && (
          <Form.Item>
            <Button
              type='primary'
              loading={loading}
              
              className='bg-red-600 mt-14 flex'
              onClick={handleDelete}
            >
              Purge
            </Button>
          </Form.Item>
        )}
      </div>
      <Modal
        title="Delete confirmation"
        visible={showDeleteModal}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete all dev projects?</p>
      </Modal>
    </section>
  );
};

export default Design;
