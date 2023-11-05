import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image5 from './images/5.jpg';
import image6 from './images/6.jpg';
import image7 from './images/7.jpg';

function Saved() {
  const images = [
    {
      original: image1,
      thumbnail: image1,
      description: 'Опис фото1',
    },
    {
      original: image2,
      thumbnail: image2,
      description: 'Опис фото2',
    },
    {
      original: image3,
      thumbnail: image3,
      description: 'Опис фото3',
    },
    {
      original: image4,
      thumbnail: image4,
      description: 'Опис фото4',
    },
    {
      original: image5,
      thumbnail: image5,
      description: 'Опис фото5',
    },
    {
      original: image6,
      thumbnail: image6,
      description: 'Опис фото',
    },
    {
      original: image7,
      thumbnail: image7,
      description: 'Опис фото',
    },

  ];

  return (
    <div>
      <h1>Галерея фото</h1>
      <Gallery items={images} />
    </div>
  );
}

export default Saved;
