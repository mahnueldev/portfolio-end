import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Checkbox, Upload, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDevProject,
  getDevProjects,
} from '../features/projects/devprojectSlice';

const { TextArea } = Input;
const CreateDevForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.devprojects);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleStacksChange = (selectedValues) => {
    setSelectedStacks(selectedValues);
  };

  const handleFormSubmit = async (values) => {
    try {
      const { name, desc, link, github, status, type, stacks, file } = values;

      const formData = new FormData();
     
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('link', link);
      formData.append('github', github);
      formData.append('status', status);
      formData.append('type', type);
      formData.append('stacks', stacks);
      formData.append('file', file[0].originFileObj);

      await dispatch(createDevProject({ formData })).unwrap();
      dispatch(getDevProjects());
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
        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='desc' rules={[{ required: true, message: 'Please enter a description' }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Link to site' name='link'>
          <Input />
        </Form.Item>
        <Form.Item label='Github' name='github'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='status'>
          <Select>
            <Select.Option value='false' name='status'>
              false
            </Select.Option>
            <Select.Option value='true' name='status'>
              true
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Type' name='type'>
          <Select>
            <Select.Option value='web'>Web</Select.Option>
            <Select.Option value='mobile'>Mobile</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Stacks' name='stacks'>
          <Checkbox.Group
            options={[
              { label: 'Wordpress', value: 'wordpress' },
              { label: 'HTML', value: 'html' },
              { label: 'CSS', value: 'css' },
              { label: 'TailwindCSS', value: 'tailwind' },
              { label: 'Bootstrap', value: 'bootstrap' },
              { label: 'Javascript', value: 'javascript' },
              { label: 'React', value: 'react' },
              { label: 'NextJS', value: 'nextjs' },
              { label: 'Vue', value: 'vue' },
              { label: 'ReactNative', value: 'react-native' },
              { label: 'NodeJS', value: 'nodejs' },
              { label: 'PHP', value: 'php' },
              { label: 'Laravel', value: 'laravel' },
              { label: 'C#', value: 'c#' },
              { label: '.NET', value: '.net' },
              { label: 'GO', value: 'go' },
              { label: 'ApacheServer', value: 'apacheserver' },
              { label: 'Firebase', value: 'firebase' },
              { label: 'MongoDB', value: 'mongodb' },
              { label: 'MySQL', value: 'mysql' },
              { label: 'Postgres', value: 'postgres' },
              { label: 'SQLServer', value: 'sqlserver' },
              { label: 'Git', value: 'git' },
              { label: 'Docker', value: 'docker' },
              { label: 'Kubernetes', value: 'kubernetes' },
              { label: 'Azure', value: 'azure' },
              { label: 'AWS', value: 'aws' },
            ]}
            onChange={handleStacksChange}
            value={selectedStacks}
            className='space-y-4 flex items-center justify-start flex-wrap'
          >
            {(checkbox) => (
              <Checkbox key={checkbox.value} value={checkbox.value}>
                {checkbox.label}
              </Checkbox>
            )}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name='file'
          label='File'
          valuePropName='file'
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload listType='picture-card' maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
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
            message={
              'Form submission failed. Please check the form and try again'
            }
            type='error'
          />
        )}
      </Form>
    </>
  );
};

export default CreateDevForm;
