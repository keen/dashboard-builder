import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dropHandler,
  moveChart,
  stopMoveChart
} from "../../actions/rootActions";
import checkBoundaries from "../../func/checkBoundaries";
import Resizers from "../../builder/components/Resizers";
import Paragraph from "../../builder/components/Paragraph";
import Image from "../../builder/components/Image";
import ChartContainer from "../../builder/components/ChartContainer";
import Buttons from "../../builder/components/Buttons";

class EditorDashboard extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  dropHandler = e => {
    const { grid, draggedType, palette } = this.props;
    const top = Math.round(e.pageY / grid) * grid - grid;
    const left =
      Math.round(
        (e.pageX - this.ref.current.getBoundingClientRect().left) / grid
      ) *
        grid -
      grid;
    const width = 500;
    const height = 300;
    const chartTitle = "";
    const newElement = {
      type: draggedType,
      chartTitle,
      ...checkBoundaries(
        top,
        left,
        width,
        this.ref.current.getBoundingClientRect()
      ),
      width,
      height,
      palette: palette ? palette.value : "",
      legend: { value: "right", label: "Right" },
      sparkline: { value: true, label: "Yes" },
      stacking: { value: "", label: "None" },
      savedQuery: false
    };
    e.preventDefault();
    this.props.dropHandler(newElement);
  };

  dragOverHandler = e => {
    e.preventDefault();
  };

  moveChart = index => {
    const startMove = e => {
      this.props.moveChart(
        index,
        e.pageX,
        e.pageY,
        this.ref.current.getBoundingClientRect()
      );
    };
    const stopMove = () => {
      window.removeEventListener("mousemove", startMove, false);
      this.props.stopMoveChart();
    };
    window.addEventListener("mousemove", startMove, false);
    window.addEventListener("mouseup", stopMove, false);
  };

  render() {
    const { dashboardData, isMoving, isResizing, settingsVisible, version } = this.props;
    let max = 0;
    let maxHeight = 0;
    dashboardData.forEach(el => {
      if (el.top + el.height > max) {
        max = el.top + el.height;
        maxHeight = max + 20;
      }
      if (isResizing || isMoving) {
        maxHeight += 400;
      }
    });
    return (
      <div
        style={{ height: maxHeight !== 0 && maxHeight }}
        ref={this.ref}
        className="dashboard"
        onDrop={e => this.dropHandler(e)}
        onDragOver={e => this.dragOverHandler(e)}
      >
        {dashboardData.length > 0 ? (
          dashboardData.map((el, index) => {
            const { top, left, width, height, type, src, text } = el;
            let zIndex = "";
            if (index === isMoving || index == isResizing) {
              zIndex = 101;
            }
            let opacity = 1;
            if (settingsVisible !== false && settingsVisible !== index) {
              opacity = 0.3;
            }
            return (
              <div
                style={{
                  top,
                  left,
                  width,
                  height,
                  opacity,
                  zIndex
                }}
                className="chart-container"
                key={index}
              >
                {type === "image" ? (
                  <Image
                    src={src}
                    index={index}
                    width={width}
                    height={height}
                  />
                ) : type === "paragraph" ? (
                  <Paragraph text={text} index={index} />
                ) : (
                  <ChartContainer
                    {...el}
                    index={index}
                    width={width}
                    height={height}
                    version={version}
                  />
                )}

                {version === "editor" && (
                  <React.Fragment>
                    <Resizers
                      index={index}
                      clientRect={this.ref.current && this.ref.current.getBoundingClientRect()}
                    />
                    <Buttons index={index} />
                    <div
                      className="chart-draggable"
                      onMouseDown={() => this.moveChart(index)}
                    />
                  </React.Fragment>
                )}
              </div>
            );
          })
        ) : (
          <div className="message">Add some charts from the left...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { dashboardData, palette },
    grid,
    draggedType,
    isMoving,
    isResizing,
    settingsVisible,
  } = state.editorReducer;
  return {
    dashboardData,
    grid,
    draggedType,
    palette,
    isMoving,
    isResizing,
    settingsVisible
  };
};

const mapDispatchToProps = dispatch => ({
  moveChart: (index, ePageX, ePageY, clientRect) =>
    dispatch(moveChart(index, ePageX, ePageY, clientRect)),
  dropHandler: newElement => dispatch(dropHandler(newElement)),
  stopMoveChart: () => dispatch(stopMoveChart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboard);
