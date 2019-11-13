import React from 'react';
import { connect } from 'react-redux';
import SettingsChart from './SettingsChart';
import SettingsImage from './SettingsImage';
import SettingsParagraph from './SettingsParagraph';
import SettingsDashboard from './SettingsDashboard';

const Settings = ({ settingsVisible, items, querySource }) => {
  return (
    <div className="settings-container">
      <div className="settings">
        {settingsVisible !== false && items ? (
          <React.Fragment>
            {/* Chart settings */}
            {items.type !== 'image' && items.type !== 'paragraph' && (
              <SettingsChart querySource={querySource} />
            )}
            {/* Image settings */}
            {items.type === 'image' && <div className="settings-wrapper"><SettingsImage /></div>}
            {/* Paragraph settings */}
            {items.type === 'paragraph' && <div className="settings-wrapper"><SettingsParagraph /></div>}
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
      settings: { items = [] }
    }
  } = state;
  return {
    settingsVisible,
    items: items.find(item => item.i === settingsVisible),
  };
};

export default connect(mapStateToProps)(Settings);
