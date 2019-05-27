import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const palettes = [
  {value: '', label: 'Default'},
  {value: 'autocollector', label: 'Autocollector'},
  {value: 'modern', label: 'Modern'},
  {value: 'dracula', label: 'Dracula'}
]

const TopDashboardEditorToolbar = ({
  dashboardTitle,
  changeDashboardTitle,
  saveDashboard,
  selectPalette,
  palette
}) => {
  return (
    <div className="dashboard-title">
      <input
        type="text"
        value={dashboardTitle}
        onChange={changeDashboardTitle}
        placeholder="Enter your dashboard title..."
      />
      <div className="select-palette-button">
        <label>Palette:</label>
        <select onChange={selectPalette} value={palette}>
          {
            palettes.map((el, i) => {
              return <option key={i} value={el.value}>{el.label}</option>
            })
          }
        </select>
      </div>
      <div className="save-dashboard-button" onClick={saveDashboard}>
        <FontAwesomeIcon icon="save" /> Save
      </div>
    </div>
  );
};

export default TopDashboardEditorToolbar;
