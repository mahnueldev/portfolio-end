import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaceHolderVideo from '../assets/videos/barnime.mp4';

// Icons
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

// Component
const VideoComponent = ({ src, alt, name, preview, remove }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className='relative inline-block rounded xl:w-5/6 xl:h-max md:w-3/6 h-max'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className='block border transition-opacity duration-200 object-fit ease-in-out hover:opacity-50 rounded-2xl'
      />
      {
        <section className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <button
            className='bg-transparent border-none cursor-pointer  transition-transform duration-200 ease-in-out '
            onClick={preview}
          >
            <EyeOutlined style={{ fontSize: '26px', color: '#314ffc' }} />
          </button>
          <button
            className='bg-transparent border-none cursor-pointer  transition-transform duration-200 ease-in-out '
            style={{ marginLeft: '10px' }}
            onClick={remove}
          >
            <DeleteOutlined style={{ fontSize: '26px', color: '#314ffc' }} />
          </button>
        </section>
      }
      <div className='text-center mt-2 text-sm font-bold text-dark-300'>
        {name}
      </div>
    </section>
  );
};

VideoComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default VideoComponent;
