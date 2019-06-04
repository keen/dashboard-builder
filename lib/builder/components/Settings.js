import React from "react";
import SettingsChart from "./SettingsChart";
import SettingsImage from "./SettingsImage";
import SettingsParagraph from "./SettingsParagraph";
import SettingsDashboard from "./SettingsDashboard";

const Settings = ({
  settingsVisible,
  dashboardData,
  selectSavedQuery,
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  setSrcForImg,
  setTextForParagraph,
  savedQueries,
  selectPalette,
  palette
}) => {
  return (
    <div className="settings-container">
      <div className="settings">
        {settingsVisible !== false ? (
          <React.Fragment>
            {/* Chart settings */}
            {dashboardData.type !== "image" &&
              dashboardData.type !== "paragraph" && (
                <SettingsChart
                  savedQueries={savedQueries}
                  dashboardData={dashboardData}
                  settingsVisible={settingsVisible}
                  selectSavedQuery={selectSavedQuery}
                  selectLegendPosition={selectLegendPosition}
                  selectSparklineOption={selectSparklineOption}
                  selectStackingOption={selectStackingOption}
                />
              )}
            {/* Image settings */}
            {dashboardData.type === "image" && (
              <SettingsImage
                dashboardData={dashboardData}
                settingsVisible={settingsVisible}
                setSrcForImg={setSrcForImg}
              />
            )}
            {/* Paragraph settings */}
            {dashboardData.type === "paragraph" && (
              <SettingsParagraph
                settingsVisible={settingsVisible}
                dashboardData={dashboardData}
                setTextForParagraph={setTextForParagraph}
              />
            )}
          </React.Fragment>
        ) : (
          <SettingsDashboard palette={palette} selectPalette={selectPalette} />
        )}
      </div>
    </div>
  );
};

export default Settings;
