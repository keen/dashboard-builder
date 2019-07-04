import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Image = ({ width, height, src }) => {
  return src ? (
    <img style={{ width, height }} src={src} />
  ) : (
    <div className="big-icon">
      <FontAwesomeIcon icon="image" />
    </div>
  );
};

export default Image;
