import React, { Component } from 'react'
import { connect } from "react-redux";
import {
  selectPalette,
  changeColors,
  changePickerColors,
  toggleDryRun,
  toggleIsPublic,
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
        <Tab>Theme</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanel className="settings-theme-builder">
        <Builder
          key={props.colors.length}
          isDashboardBuilderActive={true}
          onChange={builderOnChange}
          colors={props.colors || []}
          chartPalette={props.palette}
          shouldRenderMockUp={false}
          picker={props.picker || {}}
        />
      </TabPanel>
      <TabPanel>
        <label
          data-for="dry-run"
          data-tip="Prototype your dashboard with a dummy data"
          className="label-with-checkbox"
        >
          <input
            type="checkbox"
            checked={props.dryRun}
            onChange={props.toggleDryRun}
          />
          <span>
            Dry run
          </span>
        </label>
        <ReactTooltip
          id="dry-run"
          place="top"
          type="dark"
          effect="solid"
          getContent={dataTip => dataTip}
        />
        <label
          data-for="is-public"
          data-tip="Make your dashboard shareable"
          className="label-with-checkbox"
        >
          <input
            type="checkbox"
            checked={props.isPublic}
            onChange={props.toggleIsPublic}
          />
          <span>
            Is Public
          </span>
        </label>
        <ReactTooltip
          id="is-public"
          place="top"
          type="dark"
          effect="solid"
          getContent={dataTip => dataTip}
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
    dryRun,
  } = state.dashboardInfo.settings;
  const {
    is_public,
  } = state.dashboardInfo;
  return {
    palette,
    colors,
    picker,
    dryRun,
    isPublic: is_public,
  };
};

const mapDispatchToProps = dispatch => ({
  selectPalette: value => dispatch(selectPalette(value)),
  changeColors: value => dispatch(changeColors(value)),
  changePickerColors: value => dispatch(changePickerColors(value)),
  toggleDryRun: () => dispatch(toggleDryRun()),
  toggleIsPublic: () => dispatch(toggleIsPublic()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDashboard);
