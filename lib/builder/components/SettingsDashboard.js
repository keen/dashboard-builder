import React from "react";
import { connect } from "react-redux";
import { selectPalette, toogleDryRun } from '../../actions/rootActions';
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const paletteOptions = [
  { value: "", label: "Default" },
  { value: "autocollector", label: "Autocollector" },
  { value: "modern", label: "Modern" },
  { value: "dracula", label: "Dracula" }
];

const SettingsDashboard = (props) => {
  return (
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>Theme</Tab>
      </TabList>

      <TabPanel>
        <h4>Dry run:</h4>
        <input type="checkbox" checked={props.dryRun} onChange={props.toogleDryRun}/>
        <h4>Palette:</h4>
        <Select
          value={props.palette}
          onChange={props.selectPalette}
          options={paletteOptions}
        />
      </TabPanel>
      <TabPanel>
        Theme builder
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = state => {
  const { palette, dryRun } = state.editorReducer.dashboardInfo;
  return {
    palette,
    dryRun
  }
}

const mapDispatchToProps = dispatch => ({
  selectPalette: (value) => dispatch(selectPalette(value)),
  toogleDryRun: () => dispatch(toogleDryRun())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);
