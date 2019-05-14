import React from "react";
import Resizers from "./Resizers";
import Chart from "./Chart";
import ChartButtons from "./ChartButtons";
import SavedQueriesSelect from "./SavedQueriesSelect";

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
      selectSavedQuery
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
    console.log();

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
            const { top, left, width, height, type, chartTitle, results } = el;
            return (
              <div
                style={{
                  top,
                  left,
                  width,
                  height
                }}
                className="chart-container"
                key={index}
              >
                <React.Fragment>
                  <div className="chart-title">
                    <input
                      type="text"
                      value={chartTitle}
                      onChange={e => changeTitle(e, index)}
                      placeholder="Enter your title..."
                    />
                  </div>
                  <Chart type={type} width={width} height={height} {...el} />
                </React.Fragment>
                {!results ? (
                  <SavedQueriesSelect
                    selectSavedQuery={selectSavedQuery}
                    index={index}
                    type={type}
                  />
                ) : null}
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
