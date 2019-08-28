import React from "react";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Paragraph = ({ width, height, text }) => {
  return text ? (
    <div className="paragraph" style={{ width, height }}>
      {ReactHtmlParser(text)}
    </div>
  ) : (
    <div className="big-icon">
      <FontAwesomeIcon icon="paragraph" size="lg" />
    </div>
  );
};

export default Paragraph;
