import React from "react";
import Resizers from "./Resizers";
import Chart from "keen-react-charts";
import ChartButtons from "./ChartButtons";

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
      changeTitle
    },
    ref
  ) => {
    const data = { result: [200, 300, 100] };
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
        {dashboardData.map(
          ({ top, left, width, height, type, title }, index) => {
            return (
              <div
                style={{
                  top,
                  left,
                  width,
                  height,
                  maxWidth: width,
                  maxHeight: height
                }}
                className="chart-container"
                key={index}
              >
                {isMoving === false && isResizing === false ? (
                  <React.Fragment>
                    <div className="chart-title">
                      <input
                        type="text"
                        value={title}
                        onChange={e => changeTitle(e, index)}
                        placeholder="Enter your title..."
                      />
                    </div>
                    <Chart type={type} results={data} />
                  </React.Fragment>
                ) : (
                  <h2>{type.toUpperCase()} CHART</h2>
                )}
                <Resizers
                  resize={resize}
                  index={index}
                  isResizing={isResizing}
                />
                <ChartButtons
                  moveChart={moveChart}
                  deleteChart={deleteChart}
                  index={index}
                  isMoving={isMoving}
                  isResizing={isResizing}
                />
              </div>
            );
          }
        )}
      </div>
    );
  }
);
export default Dashboard;
