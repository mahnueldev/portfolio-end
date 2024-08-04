import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDesProject,
  getDesProjects,
  deleteDesProjectById,
} from '../features/projects/desprojectSlice';
import ImageComponent from './ImageComponent';
import PlaceHolderImage from '../assets/images/krest.png';
import { Form, Input, Alert, Modal, Checkbox, Select } from 'antd';
const { TextArea } = Input;

const RenderDesProj = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const { desprojects } = useSelector((state) => state.desprojects);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [form] = Form.useForm();

  const handleStacksChange = (selectedValues) => {
    setSelectedStacks(selectedValues);
  };

  useEffect(() => {
    dispatch(getDesProjects());
  }, [dispatch]);

  // dELETE PROJECT
  const handleDeleteId = (id) => {
    dispatch(deleteDesProjectById(id))
      .then((result) => {
        // handle success
        console.log(result);
        dispatch(getDesProjects());
      })
      .catch((error) => {
        // handle error
        console.log('problem deleting');
      });
  };
  // eDIT PROJECT
  const handleEdit = (project) => {
    setIsModalVisible(true);
    // e.preventDefault();
    setEditingProject(project);

    // extract form data
  };
  // Cancel the modal
  const handleCancel = () => {
    // Reset the form values
    form.resetFields();
    // Set the visibility of the modal to false
    setIsModalVisible(false);
  };
  // Handle the submit event
  const handleOk = () => {
    // Submit the form data
    form.submit();
  };
  const sortedProjects = [...desprojects].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // ******************************************************************************

  const handleFormSubmit = async (values) => {
    try {
      const { name, desc, link,  status, type, stacks } = values;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('link', link);
      formData.append('status', status);
      formData.append('type', type);
      formData.append('stacks', stacks);

      await dispatch(
        updateDesProject({ id: editingProject._id, formData })
      ).unwrap();
      dispatch(getDesProjects());
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      form.resetFields();
      setIsModalVisible(false);
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
    <section className='grid grid-cols-3 m-6 gap-2'>
      {sortedProjects.map((project) => {
        return (
          <ImageComponent
            key={project._id}
            src={project.url}
            name={project.name}
            alt={PlaceHolderImage}
            remove={() => handleDeleteId(project._id)}
            edit={() => handleEdit(project)}
          />
        );
      })}
      <Modal
        title='Edit Project'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: '#39cddb', color: 'white' } }}
      >
        <Form
          initialValues={editingProject}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          onFinish={handleFormSubmit}
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
        <Select.Option value={false}>false</Select.Option>
        <Select.Option value={true}>true</Select.Option>
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
              message={'Edit: Something went wrong'}
              type='error'
            />
          )}
        </Form>
      </Modal>
    </section>
  );
};

export default RenderDesProj;
