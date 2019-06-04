import React from "react";
import SavedQueriesSelect from "./SavedQueriesSelect";
import Select from "react-select";

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

const SettingsChart = ({
  settingsVisible,
  dashboardData: { type, savedQuery, sparkline, results, stacking, legend },
  selectSavedQuery,
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  savedQueries
}) => {
  return (
    <React.Fragment>
      <React.Fragment>
        <h4>Saved Query:</h4>
        <SavedQueriesSelect
          value={savedQuery}
          selectSavedQuery={selectSavedQuery}
          index={settingsVisible}
          type={type}
          savedQueries={savedQueries}
        />
      </React.Fragment>
      {savedQuery &&
        results.query.group_by &&
        !sparkline.value &&
        type !== "table" && (
          <React.Fragment>
            <h4>Legend:</h4>
            <Select
              value={legend}
              onChange={e => selectLegendPosition(e, settingsVisible)}
              options={legendPosition}
            />
          </React.Fragment>
        )}
      {savedQuery && type !== "table" && (
        <React.Fragment>
          <h4>Sparkline:</h4>
          <Select
            value={sparkline}
            onChange={e => selectSparklineOption(e, settingsVisible)}
            options={sparklineOptions}
          />
        </React.Fragment>
      )}
      {savedQuery &&
        results.query.group_by &&
        type !== "table" &&
        type !== "pie" && (
          <React.Fragment>
            <h4>Stacking:</h4>
            <Select
              value={stacking}
              onChange={e => selectStackingOption(e, settingsVisible)}
              options={stackingOptions}
            />
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

export default SettingsChart;
