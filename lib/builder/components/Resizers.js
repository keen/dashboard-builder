import React from "react";

const Resizers = ({ resize, index, isResizing }) => {
  return (
    <div
      className="resizers"
      style={{ visibility: isResizing === index ? "visible" : "" }}
    >
      <div className="top-left" onMouseDown={e => resize(e, index)} />
      <div className="top-right" onMouseDown={e => resize(e, index)} />
      <div className="bottom-left" onMouseDown={e => resize(e, index)} />
      <div className="bottom-right" onMouseDown={e => resize(e, index)} />
      <div className="left" onMouseDown={e => resize(e, index)} />
      <div className="right" onMouseDown={e => resize(e, index)} />
      <div className="top" onMouseDown={e => resize(e, index)} />
      <div className="bottom" onMouseDown={e => resize(e, index)} />
    </div>
  );
};
export default Resizers;
