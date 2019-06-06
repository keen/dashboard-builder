import React from "react";
import Chart from "./Chart";

const ChartContainer = (props) => {
  const {
    chartTitle,
    index,
    type,
    legend,
    sparkline,
    stacking,
    results,
    changeTitle
  } = props;
  return (
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
        {...props}
        legend={
          legend.value === false ? { show: false } : { position: legend.value }
        }
        sparkline={sparkline.value && sparkline.value}
        stacking={stacking.value && stacking.value}
      />
      {!results && (
        <div className="new-chart-info">
          <div className="save-query-message">
            Select saved queries for this chart...
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChartContainer;
