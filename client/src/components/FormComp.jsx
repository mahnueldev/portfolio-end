import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const FormComp = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onFinishFailed = () => {
    if (error) {
      return <Alert message='{error}' type='error' />;
    }
  };
  const handleFocus = () => {
    if (error) {
      dispatch({ type: 'auth/clearError' });
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete='off'
    >
      {error && <Alert className='mb-4' message={error} type='error' />}
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          name='email'
          value={credentials.email}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          name='password'
          value={credentials.password}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </Form.Item>

      <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type='primary'
          loading={loading}
          htmlType='submit'
          className='bg-blue-600'
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComp;
