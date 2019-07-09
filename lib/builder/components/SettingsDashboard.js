import React from "react";
import { connect } from "react-redux";
import {
  selectPalette,
  changeColors,
  changePickerColors,
  toogleDryRun
} from "../../actions/rootActions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Builder from "keen-theme-builder";
import isEqual from "lodash/isEqual";
import ReactTooltip from "react-tooltip";

const SettingsDashboard = props => {
  const builderOnChange = data => {
    const { chartPalette, colors, picker } = data;

    if (!isEqual(chartPalette, props.palette)) {
      props.selectPalette(chartPalette);
    }

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
        <label><input
          type="checkbox"
          checked={props.dryRun}
          onChange={props.toogleDryRun}
          data-for="dry-run"
          data-tip="Prototype your dashboard with a dummy data"
        /> Dry run</label>
        <ReactTooltip
          id="dry-run"
          place="top"
          type="dark"
          effect="solid"
          getContent={dataTip => dataTip}
        />
      </TabPanel>
      <TabPanel className="settings-theme-builder">
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
  const {
    palette = {},
    colors = [],
    picker = {},
    dryRun
  } = state.dashboardInfo;
  return {
    palette,
    colors,
    picker,
    dryRun
  };
};

const mapDispatchToProps = dispatch => ({
  selectPalette: value => dispatch(selectPalette(value)),
  changeColors: value => dispatch(changeColors(value)),
  changePickerColors: value => dispatch(changePickerColors(value)),
  toogleDryRun: () => dispatch(toogleDryRun())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDashboard);
