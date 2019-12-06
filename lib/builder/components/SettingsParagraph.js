import React from 'react';
import TextEditor from './TextEditor';

const SettingsParagraph = () => {
  return (
    <div className="settings-chart">
      <div className="settings-chart-saved-query">
        <h4>Text</h4>
        <TextEditor />
      </div>
    </div>
  );
};

export default SettingsParagraph;
