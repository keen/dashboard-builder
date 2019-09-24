import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Image = ({ src }) => {
  return src ? (
    <img src={src} />
  ) : (
    <div className="big-icon">
      <FontAwesomeIcon icon="image" size="lg" />
    </div>
  );
};

export default Image;
