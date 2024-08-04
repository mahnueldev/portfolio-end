import React, { useEffect, useState } from 'react';
import { getCerts, updateCert, deleteCertById } from '../features/certs/certSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, Button, List, Space, message } from 'antd';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const RenderCert = () => {
  const { certs } = useSelector((state) => state.certs);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editCert, setEditCert] = useState(null);

  useEffect(() => {
    dispatch(getCerts());
  }, [dispatch]);

  const handleEditClick = (id) => {
    setIsEditModalVisible(true);
    const certToEdit = certs.find((cert) => cert._id === id);
    setEditCert(certToEdit);
    form.setFieldsValue({
      title: certToEdit.title,
      institute: certToEdit.institute,
      link: certToEdit.link,
    });
  };

  const handleUpdateCert = async (values) => {
    try {
      await dispatch(updateCert({ id: editCert._id, formParams: values }));
      dispatch(getCerts());
      setIsEditModalVisible(false);

      // Display a success message when the certificate is updated.
      message.success('Certificate updated successfully');
    } catch (err) {
      console.log('Error encountered trying to update', err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleDeleteCert = (id) => {
    dispatch(deleteCertById(id))
      .then((result) => {
        // Handle success
        console.log(result);
        dispatch(getCerts());

        // Display a success message when the certificate is deleted.
        message.success('Certificate deleted successfully');
      })
      .catch((error) => {
        // Handle error
        console.log('Problem deleting');
      });
  };

  const handleOk = () => {
    // Submit the form data
    form.submit();
  };

  const handleCancel = () => {
    // Reset the form values
    form.resetFields();
    // Set the visibility of the modal to false
    setIsEditModalVisible(false);
  };

  return (
    <>
      <List
        dataSource={certs}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Space size='middle'>
                <Button
                  type='primary'
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick(item._id)}
                  className='bg-green-300'
                >
                  Edit
                </Button>
                <Button
                  type='danger'
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteCert(item._id)}
                  className='bg-red-300'
                >
                  Delete
                </Button>
              </Space>,
            ]}
          >
            {item.title} - {item.institute}
          </List.Item>
        )}
      />

      <Modal
        title='Edit Certificate'
        open={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: '#39cddb', color: 'white' } }}
      >
        <Form
          initialValues={editCert}
          form={form}
          onFinish={handleUpdateCert}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name='title' label='Title'>
            <Input />
          </Form.Item>
          <Form.Item name='institute' label='Institute'>
            <Input />
          </Form.Item>
          <Form.Item name='link' label='link'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RenderCert;
