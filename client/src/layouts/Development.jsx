import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Checkbox, Upload } from 'antd';

const { TextArea } = Input;
const { Item } = Form;
const Development = () => {
  const [selectedStacks, setSelectedStacks] = useState([]);

  const handleStacksChange = (selectedValues) => {
    setSelectedStacks(selectedValues);
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
      >
        <Form.Item label='Name'>
          <Input />
        </Form.Item>
        <Form.Item label='Description'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Link'>
          <Input />
        </Form.Item>
        <Form.Item label='Status'>
          <Select>
            <Select.Option value='demo'>false</Select.Option>
            <Select.Option value='demo'>true</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Type'>
          <Select>
            <Select.Option value='demo'>Web</Select.Option>
            <Select.Option value='demo'>Mobile</Select.Option>
          </Select>
        </Form.Item>

        <Item label='Stacks'>
          <Checkbox.Group
            options={[
              { label: 'HTML', value: 'html' },
              { label: 'CSS', value: 'css' },
              { label: 'Javascript', value: 'javascript' },
              { label: 'React', value: 'react' },
              { label: 'ReactNative', value: 'react-native' },
              { label: 'Server', value: 'server' },
              { label: 'NextJS', value: 'nextjs' },
              { label: 'NodeJS', value: 'nodejs' },
              { label: 'Firebase', value: 'firebase' },
              { label: 'NodeJS', value: 'nodejs' },
              { label: 'MongoDB', value: 'mongodb' },
              { label: 'MySQL', value: 'mysql' },
              { label: 'wordpress', value: 'wordpress' },
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
        </Item>

        <Form.Item label='Upload' valuePropName='fileList'>
          <Upload action='/upload.do' listType='picture-card' maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            // loading={loading}
            htmlType='submit'
            className='bg-blue-600'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Development;
