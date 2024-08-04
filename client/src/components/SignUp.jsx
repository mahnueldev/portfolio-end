import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Alert, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleSubmit = (values) => {
    // Ensure passwords match before dispatching the signup action
    if (credentials.password !== credentials.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }
    dispatch(signup(credentials))
      .unwrap() // Use unwrap to handle the resolved value or error
      .then(() => {
        message.success('Registration successful!');
        navigate('/'); // Redirect to home page on successful registration
      })
      .catch(() => {
        message.error(error.message || 'Registration failed. Please try again.');
      });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onFinishFailed = () => {
    if (error) {
      return <Alert message={error} type='error' />;
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
      name='signup'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete='on'
    >
      {error && <Alert className='mb-4' message={error} type='error' />}
      
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input
          name='name'
          value={credentials.name}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </Form.Item>

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
        label='Confirm Password'
        name='confirmPassword'
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password
          name='confirmPassword'
          value={credentials.confirmPassword}
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

export default SignUp;
