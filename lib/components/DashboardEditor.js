import React from "react";
import Resizers from "./Resizers";
import Chart from "./Chart";
import ChartButtons from "./ChartButtons";
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = React.forwardRef(
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
      settingsVisible
    },
    ref
  ) => {
    let max = 0;
    let maxHeight = 0;
    dashboardData.forEach(el => {
      if (el.top > max) {
        max = el.top;
        maxHeight = max + el.height + 20;
      }
    });

    return (
      <div
        style={{ height: maxHeight !== 0 ? maxHeight : "" }}
        ref={ref}
        className="dashboard"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        {dashboardData.length > 0 ? (
          dashboardData.map((el, index) => {
            const { top, left, width, height, type, chartTitle, results, src, text } = el;
            let zIndex = '';
            if(index === isMoving || index == isResizing){
              zIndex = 9;
            }
            let opacity = 1;
            if(settingsVisible !== false && settingsVisible !== index){
              opacity = 0.3;
            }
            return (
              <div
                style={{
                  top,
                  left,
                  width,
                  height,
                  zIndex,
                  opacity
                }}
                className="chart-container"
                key={index}
              >
                {type !== "image" && type !== "paragraph" ? (
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
                      sparkline={
                        el.sparkline.value && el.sparkline.value
                      }
                      stacking={
                        el.stacking.value && el.stacking.value
                      }
                    />
                  </React.Fragment>
                ) : type === "image" ? (
                  src && <img style={{width, height}} src={src} />
                ) : (
                  text && <div className="paragraph" style={{width, height}}>{ReactHtmlParser(text)}</div>
                )}

                {!results &&
                  type !== "image" &&
                  type !== "paragraph" && (
                    <div className="new-chart-info">
                      <div className="save-query-message">
                        Select saved queries for this chart...
                      </div>
                    </div>
                  )}
                {type === "image" && src === undefined && (
                  <div className="image-src">
                    <FontAwesomeIcon icon="image" />
                  </div>
                )}
                {type === "paragraph" && text === '' && (
                  <div className="image-src">
                    <FontAwesomeIcon icon="paragraph" />
                  </div>
                )}
                <Resizers
                  resize={resize}
                  index={index}
                  isResizing={isResizing}
                />
                <ChartButtons
                  deleteChart={deleteChart}
                  index={index}
                  isMoving={isMoving}
                  isResizing={isResizing}
                  settingsShow={settingsShow}
                />
                <div
                  className="chart-draggable"
                  onMouseDown={e => moveChart(e, index)}
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

export default Dashboard;
