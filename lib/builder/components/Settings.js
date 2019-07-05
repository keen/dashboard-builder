import React from "react";
import { connect } from "react-redux";
import SettingsChart from "./SettingsChart";
import SettingsImage from "./SettingsImage";
import SettingsParagraph from "./SettingsParagraph";
import SettingsDashboard from "./SettingsDashboard";

const Settings = ({ settingsVisible, dashboardData }) => {
  return (
    <div className="settings-container">
      <div className="settings">
        {settingsVisible !== false && dashboardData ? (
          <React.Fragment>
            {/* Chart settings */}
            {dashboardData.type !== "image" &&
              dashboardData.type !== "paragraph" && <SettingsChart />}
            {/* Image settings */}
            {dashboardData.type === "image" && <SettingsImage />}
            {/* Paragraph settings */}
            {dashboardData.type === "paragraph" && <SettingsParagraph />}
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
      dashboardData
    }
  } = state;
  return {
    settingsVisible,
    dashboardData: dashboardData[settingsVisible]
  }
}

export default connect(mapStateToProps)(Settings);
