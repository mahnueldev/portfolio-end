import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Checkbox, Upload, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDesProject,
  getDesProjects,
} from '../features/projects/desprojectSlice';

const { TextArea } = Input;
const CreateDesForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.desprojects);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleStacksChange = (selectedValues) => {
    setSelectedStacks(selectedValues);
  };

  const handleFormSubmit = async (values) => {
    try {
      const { name, desc, link,  status,  type, stacks, file } = values;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('link', link);
      formData.append('type', type);
      formData.append('status', status);
      formData.append('stacks', stacks);
      formData.append('file', file[0].originFileObj);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await dispatch(createDesProject({ formData, config })).unwrap();
      dispatch(getDesProjects());
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
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='desc'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Link to site' name='link'>
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
            <Select.Option value='ui'>UI</Select.Option>
            <Select.Option value='ux'>UX</Select.Option>
            <Select.Option value='combined'>Combined</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Stacks' name='stacks'>
          <Checkbox.Group
            options={[
                { label: 'Photoshop', value: 'photoshop' },
                { label: 'Illustrator', value: 'illustrator' },
                { label: 'Figma', value: 'figma' },
                { label: 'XD', value: 'xd' },
                { label: 'AfterEffects', value: 'aftereffects' },
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
            className='bg-blue-600'
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

export default CreateDesForm;
