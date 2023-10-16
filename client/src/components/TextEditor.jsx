import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrUpdateProfile,
  getProfile,
} from '../features/profile/profileSlice';

const TextEditor = () => {
  const { profile, loading, success, error } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const [text, setText] = useState(profile.about || ''); // Set the initial text to profile.about
  const editorStyle = {
    height: '20rem',
  };
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ color: ['#000000', '#66d8e1', '#15868e', '#fbbda7', '#e87a51'] }],
    ],
  };

  // Fetch the current profile content when the component mounts
  useEffect(() => {
    try {
      dispatch(getProfile());
    } catch (error) {
      console.error('Error fetching profile content:', error);
    }
  }, [dispatch]);

  const onFinish = async () => {
    try {
      await dispatch(createOrUpdateProfile({ about: text }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    if (success) {
      message.success('Profile updated successfully');
    }
  };

  const onFinishFailed = async () => {
    if (error) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Form name='textEditor' onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name='editorContent'>
        <div className='prose'>
          <ReactQuill
            value={text} // Set the value of ReactQuill to the text
            onChange={setText}
            modules={modules}
            style={editorStyle}
            theme='snow'
          />
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='bg-green-300 mt-10'
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TextEditor;
