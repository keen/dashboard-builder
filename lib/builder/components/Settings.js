import React from "react";
import { connect } from "react-redux";
import SettingsChart from "./SettingsChart";
import SettingsImage from "./SettingsImage";
import SettingsParagraph from "./SettingsParagraph";
import SettingsDashboard from "./SettingsDashboard";

const Settings = ({ settingsVisible, items }) => {
  return (
    <div className="settings-container">
      <div className="settings">
        {settingsVisible !== false && items ? (
          <React.Fragment>
            {/* Chart settings */}
            {items.type !== "image" && items.type !== "paragraph" && (
              <SettingsChart />
            )}
            {/* Image settings */}
            {items.type === "image" && <SettingsImage />}
            {/* Paragraph settings */}
            {items.type === "paragraph" && <SettingsParagraph />}
          </React.Fragment>
        ) : (
          <SettingsDashboard />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: {
      data: { items }
    }
  } = state;
  return {
    settingsVisible,
    items,
  };
};

export default connect(mapStateToProps)(Settings);
