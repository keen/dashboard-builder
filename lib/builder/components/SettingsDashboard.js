import React from "react";
import { connect } from "react-redux";
import { selectPalette, changeColors, changePickerColors, toogleDryRun } from '../../actions/rootActions';
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Builder from 'keen-theme-builder';
import isEqual from 'lodash/isEqual';

const paletteOptions = [
  { value: "", label: "Default" },
  { value: "autocollector", label: "Autocollector" },
  { value: "modern", label: "Modern" },
  { value: "dracula", label: "Dracula" }
];

const SettingsDashboard = (props) => {
  const builderOnChange = (data) => {
    const { colors, picker } = data;

    if (!isEqual(colors, props.colors)) {
      props.changeColors(colors);
    }

    if (picker && !isEqual(picker, props.picker)) {
      props.changePickerColors(picker);
    }
    
  };

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
        <Builder
          isDashboardBuilderActive={true}
          onChange={builderOnChange}
          colors={props.colors || []}
          chartPalette={props.palette}
          shouldRenderMockUp={false}
          picker={props.picker || {}}
        />
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = state => {
  const { palette = {}, colors = [], picker = {}, dryRun } = state.editorReducer.dashboardInfo;
  return {
    palette,
    colors,
    picker,
    dryRun
  }
}

const mapDispatchToProps = dispatch => ({
  selectPalette: (value) => dispatch(selectPalette(value)),
  changeColors: value => dispatch(changeColors(value)),
  changePickerColors: value => dispatch(changePickerColors(value)),
  toogleDryRun: () => dispatch(toogleDryRun())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);
