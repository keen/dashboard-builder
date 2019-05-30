import React from "react";
import SavedQueriesSelect from "./SavedQueriesSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import TextEditor from "./TextEditor";

const legendPosition = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: false, label: "Hidden" }
];

const sparklineOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const stackingOptions = [
  { value: "", label: "None" },
  { value: "normal", label: "Normal" },
  { value: "percent", label: "Percent" }
];

const Settings = ({
  settingsVisible,
  closeSettings,
  dashboardData,
  selectSavedQuery,
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  setSrcForImg,
  setTextForParagraph,
  savedQueries
}) => {
  return (
    <div
      className={`settings-hidden ${settingsVisible !== false &&
        "settings-visible"}`}
    >
      <div className="settings-close" onClick={closeSettings}>
        <FontAwesomeIcon icon="arrow-right" />
      </div>
      {settingsVisible !== false && (
        <React.Fragment>
          {/* Chart settings */}
          {dashboardData.type !== "image" &&
            dashboardData.type !== "paragraph" && (
              <React.Fragment>
                <h4>Saved Query:</h4>
                <SavedQueriesSelect
                  value={dashboardData.savedQuery}
                  selectSavedQuery={selectSavedQuery}
                  index={settingsVisible}
                  type={dashboardData.type}
                  savedQueries={savedQueries}
                />
              </React.Fragment>
            )}
          {dashboardData.results &&
            dashboardData.results.query.group_by &&
            !dashboardData.sparkline.value && (
              <React.Fragment>
                <h4>Legend:</h4>
                <Select
                  value={dashboardData.legend}
                  onChange={e => selectLegendPosition(e, settingsVisible)}
                  options={legendPosition}
                />
              </React.Fragment>
            )}
          {dashboardData.savedQuery && (
            <React.Fragment>
              <h4>Sparkline:</h4>
              <Select
                value={dashboardData.sparkline}
                onChange={e => selectSparklineOption(e, settingsVisible)}
                options={sparklineOptions}
              />
            </React.Fragment>
          )}
          {dashboardData.savedQuery && dashboardData.results.query.group_by && (
            <React.Fragment>
              <h4>Stacking:</h4>
              <Select
                value={dashboardData.stacking}
                onChange={e => selectStackingOption(e, settingsVisible)}
                options={stackingOptions}
              />
            </React.Fragment>
          )}
          {/* Image settings */}
          {dashboardData.type === "image" && (
            <React.Fragment>
              <h4>Image url:</h4>
              <input
                onChange={e => setSrcForImg(e, settingsVisible)}
                className="settings-input"
                value={dashboardData.src}
              />
            </React.Fragment>
          )}
          {/* Paragraph settings */}
          {dashboardData.type === "paragraph" && (
            <React.Fragment>
              <h4>Text:</h4>
              <TextEditor
                setTextForParagraph={setTextForParagraph}
                value={dashboardData.text}
                index={settingsVisible}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Settings;
