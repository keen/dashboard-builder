import React from "react";
import Resizers from "../../builder/components/Resizers";
import Paragraph from "../../builder/components/Paragraph";
import Image from "../../builder/components/Image";
import ChartContainer from "../../builder/components/ChartContainer";
import Buttons from "../../builder/components/Buttons";

const EditorDashboard = React.forwardRef(
  (
    {
      dropHandler,
      dragOverHandler,
      dashboardData,
      resize,
      isResizing,
      moveChart,
      isMoving,
      deleteChart,
      changeTitle,
      settingsShow,
      settingsVisible,
      cloneChart
    },
    ref
  ) => {
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
        ref={ref}
        className="dashboard"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
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
                    changeTitle={changeTitle}
                    index={index}
                    width={width}
                    height={height}
                  />
                )}
                {deleteChart && (
                  <React.Fragment>
                    <Resizers
                      resize={resize}
                      index={index}
                      isResizing={isResizing}
                    />
                    <Buttons
                      deleteChart={deleteChart}
                      index={index}
                      isMoving={isMoving}
                      isResizing={isResizing}
                      settingsShow={settingsShow}
                      cloneChart={cloneChart}
                    />
                    <div
                      className="chart-draggable"
                      onMouseDown={() => moveChart(index)}
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
);

export default EditorDashboard;
