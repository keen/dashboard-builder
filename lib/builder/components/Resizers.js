import React from "react";
import { connect } from "react-redux";
import { resizeChart, stopResizeChart } from "../../actions/rootActions";

const Resizers = props => {
  const resizeChart = (e, index) => {
    const element = e.target.getAttribute("class");
    const startResize = event => {
      const positionX = event.pageX - props.clientRect.left;
      const positionY = event.pageY - props.clientRect.top;
      if (positionX <= 1180 && positionX >= 20 && positionY >= 20) {
        props.resizeChart(
          index,
          event.pageX,
          event.pageY,
          props.clientRect,
          element
        );
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", startResize, false);
      props.stopResizeChart();
    };
    window.addEventListener("mousemove", startResize, false);
    window.addEventListener("mouseup", stopResize, false);
    e.stopPropagation();
  };
  const { index, isResizing } = props;
  return (
    <div
      className="resizers"
      style={{ visibility: isResizing === index ? "visible" : "" }}
    >
      <div className="top-left" onMouseDown={e => resizeChart(e, index)} />
      <div className="top-right" onMouseDown={e => resizeChart(e, index)} />
      <div className="bottom-left" onMouseDown={e => resizeChart(e, index)} />
      <div className="bottom-right" onMouseDown={e => resizeChart(e, index)} />
      <div className="left" onMouseDown={e => resizeChart(e, index)} />
      <div className="right" onMouseDown={e => resizeChart(e, index)} />
      <div className="top" onMouseDown={e => resizeChart(e, index)} />
      <div className="bottom" onMouseDown={e => resizeChart(e, index)} />
    </div>
  );
};

const mapStateToProps = state => {
  const { isResizing } = state;
  return {
    isResizing
  };
};

const mapDispatchTopProps = {
  resizeChart,
  stopResizeChart
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(Resizers);
