import React from "react";
import Chart from "./Chart";
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorDashboard = React.forwardRef(
  (
    {
      dashboardData,
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
      >
        {dashboardData.length > 0 ? (
          dashboardData.map((el, index) => {
            const { top, left, width, height, type, chartTitle, results, src, text } = el;
            return (
              <div
                style={{
                  top,
                  left,
                  width,
                  height,
                }}
                className="chart-container"
                key={index}
              >
                {type === "paragraph" ? (
                  text && <div className="paragraph" style={{width, height}}>{ReactHtmlParser(text)}</div>
                ) : type === "image" ? (
                  src && <img style={{width, height}} src={src} />
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
                      sparkline={
                        el.sparkline.value && el.sparkline.value
                      }
                      stacking={
                        el.stacking.value && el.stacking.value
                      }
                    />
                  </React.Fragment>
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
              </div>
            );
          })
        ) : (
          <div className="message">Dashboard is empty...</div>
        )}
      </div>
    );
  }
);

export default EditorDashboard;
