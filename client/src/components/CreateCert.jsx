import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newCert, getCerts } from '../features/certs/certSlice';

const CreateCert = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.desprojects);

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      const { title, institute, link } = values;

      const formParams = { title, institute, link };
      await dispatch(newCert(formParams));
      dispatch(getCerts());

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      form.resetFields();
    } catch (err) {
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        onFinish={handleFormSubmit} // Add onFinish callback to Form
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label='Certificate' name='title'>
          <Input />
        </Form.Item>
        <Form.Item label='Institute' name='institute'>
          <Input />
        </Form.Item>

        <Form.Item label='Link' name='link'>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            loading={loading}
            htmlType='submit'
            className='bg-green-300'
          >
            Submit
          </Button>
        </Form.Item>
        {success && (
          <Alert
            className='mb-4'
            message='Form submitted successfully'
            type='success'
          />
        )}
        {failed && (
          <Alert
            className='mb-4'
            message='Form submission failed. Please check the form and try again'
            type='error'
          />
        )}
      </Form>
    </>
  );
};

export default CreateCert;
