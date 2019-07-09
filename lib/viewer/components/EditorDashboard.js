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
    const { grid, draggedType, palette, colors } = this.props;
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
      colors: colors || [],
      legend: { value: "right", label: "Right" },
      sparkline: { value: true, label: "Yes" },
      stacking: { value: "", label: "None" },
      savedQuery: []
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
    const {
      dashboardData,
      isMoving,
      isResizing,
      settingsVisible,
      version,
      picker = {}
    } = this.props;
    const { title, legend, label, chart, axis, tooltip, grid } = picker;
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
        {dashboardData.length > 0 &&
          dashboardData.map((el, index) => {
            const {
              top,
              left,
              width,
              height,
              type,
              src,
              text,
              savedQuery
            } = el;
            let zIndex = "";
            if (index === isMoving || index == isResizing) {
              zIndex = 101;
            }
            let opacity = 1;
            if (settingsVisible !== false && settingsVisible !== index) {
              opacity = 0.3;
            }
            if(version === 'editor' || (version === 'viewer' && savedQuery.length !== 0)){
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
                  className={
                    version === "viewer"
                      ? "chart-container-viewer"
                      : "chart-container"
                  }
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
                        clientRect={
                          this.ref.current &&
                          this.ref.current.getBoundingClientRect()
                        }
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
            }
          })}
        <style jsx global>{`
          .keen-dataviz .keen-dataviz-title,
          .chart-title input {
            color: ${title};
          }
          .keen-dataviz .keen-c3-legend .legend-item-text {
            color: ${legend};
          }
          .keen-dataviz .text-label {
            fill: ${label};
          }
          .keen-dataviz .text-main,
          .keen-dataviz .text-second,
          .keen-dataviz .c3-chart-arcs .c3-chart-arcs-gauge-max,
          .keen-dataviz .c3-chart-arcs .c3-chart-arcs-gauge-min,
          .keen-dataviz .c3-chart-arc .c3-gauge-value,
          .keen-dataviz .c3-chart-arc text {
            fill: ${chart};
          }
          .keen-dataviz .c3-axis text {
            fill: ${axis};
          }
          .keen-dataviz .c3-tooltip,
          .keen-dataviz .c3-tooltip-container th {
            color: ${tooltip};
          }
          .keen-dataviz .c3-grid line {
            stroke: ${grid};
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardData, palette, colors, picker },
    grid,
    draggedType,
    isMoving,
    isResizing,
    settingsVisible
  } = state;
  return {
    id,
    dashboardData,
    grid,
    draggedType,
    palette,
    colors,
    picker,
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