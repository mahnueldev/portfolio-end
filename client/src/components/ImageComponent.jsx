import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mage from '../assets/images/mage.png';
import mage2 from '../assets/images/mage2.png';
import mage3 from '../assets/images/mage3.png';
import mage4 from '../assets/images/mage4.png';
import mage5 from '../assets/images/mage5.png';
import mage6 from '../assets/images/mage6.png';

// Icons
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';

// Component
const ImageComponent = ({ src, alt, name, edit, remove }) => {
  const [hovered, setHovered] = useState(false);

  const placeholderImages = [mage, mage2, mage3, mage4, mage5, mage6];
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  const placeholderImage = placeholderImages[randomIndex];
  return (
    <section
      className='relative inline-block rounded xl:w-5/6 xl:h-max md:w-3/6 h-max'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.target.src = placeholderImage;
        }}
        className='block border transition-opacity duration-200 object-fit ease-in-out hover:opacity-50 rounded-2xl'
      />
      {
        <section className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <button
            className='bg-transparent border-none cursor-pointer  transition-transform duration-200 ease-in-out '
            onClick={edit}
          >
            <EditOutlined style={{ fontSize: '26px', color: '#314ffc' }} />
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

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ImageComponent;
