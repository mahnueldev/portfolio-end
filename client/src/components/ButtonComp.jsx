import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ButtonComp = () => {
  const size = useState('large'); // default is 'middle'

  return (
    <>
      <Button
        type='primary'
        icon={<UploadOutlined />}
        size={size}
        className='bg-blue-600'
      >
        Upload
      </Button>
    </>
  );
};

export default ButtonComp;
