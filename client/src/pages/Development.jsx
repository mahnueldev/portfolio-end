import React, { useState } from 'react';
import { CreateDevForm, RenderDevProj  } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllDevProjects } from '../features/projects/devprojectSlice';
import { Form, Button, Modal } from 'antd';

const Development = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const dispatch = useDispatch();
  const { devprojects,loading } = useSelector((state) => state.devprojects);
  const handleDeleteConfirm = () => {
    dispatch(deleteAllDevProjects());
    setShowDeleteModal(false);
  }
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  }
  return (
    <section className='flex xl:flex-row xl:justify-between  sm:flex-col'>
      <div className='w-5/6'>
        <CreateDevForm />
      </div>
      <div className='w-5/6 flex flex-col items-center overflow-y-auto h-screen '>
        <RenderDevProj />
        {devprojects.length > 0 && (
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

export default Development;
