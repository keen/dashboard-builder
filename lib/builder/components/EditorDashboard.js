import React from "react";
import Resizers from "./Resizers";
import Chart from "./Chart";
import Buttons from "./Buttons";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      if ((el.top + el.height) > max) {
        max = el.top + el.height;
        maxHeight = max + 20;
      }
      if(isResizing || isMoving) {
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
            const {
              top,
              left,
              width,
              height,
              type,
              chartTitle,
              results,
              src,
              text
            } = el;
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
                  opacity
                }}
                className="chart-container"
                key={index}
              >
                {type === "paragraph" ? (
                  text && (
                    <div className="paragraph" style={{ width, height }}>
                      {ReactHtmlParser(text)}
                    </div>
                  )
                ) : type === "image" ? (
                  src && <img style={{ width, height }} src={src} />
                ) : (
                  <React.Fragment>
                    <div className="chart-title">
                      <input
                        type="text"
                        value={chartTitle}
                        onChange={e => changeTitle(e, index)}
                        placeholder="Enter your title..."
                      />
                    </div>
                    <Chart
                      type={type}
                      {...el}
                      legend={
                        el.legend.value === false
                          ? { show: false }
                          : { position: el.legend.value }
                      }
                      sparkline={el.sparkline.value && el.sparkline.value}
                      stacking={el.stacking.value && el.stacking.value}
                    />
                  </React.Fragment>
                )}

                {!results && type !== "image" && type !== "paragraph" && (
                  <div className="new-chart-info">
                    <div className="save-query-message">
                      Select saved queries for this chart...
                    </div>
                  </div>
                )}
                {type === "image" && src === undefined && (
                  <div className="big-icon">
                    <FontAwesomeIcon icon="image" />
                  </div>
                )}
                {type === "paragraph" && text === "" && (
                  <div className="big-icon">
                    <FontAwesomeIcon icon="paragraph" />
                  </div>
                )}
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
