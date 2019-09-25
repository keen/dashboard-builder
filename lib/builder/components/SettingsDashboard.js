import React from 'react';
import { connect } from 'react-redux';
import {
  selectPalette,
  changeColors,
  changePickerColors,
  toggleDryRun,
  toggleIsPublic
} from '../../actions/rootActions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Builder from 'keen-theme-builder';
import isEqual from 'lodash/isEqual';
import ReactTooltip from 'react-tooltip';

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
          <span>Dry run</span>

          <ReactTooltip
            id="dry-run"
            place="top"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </label>
        <div className="label-wrapper">
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
            <span>Is Public</span>

            <ReactTooltip
              id="is-public"
              place="top"
              type="dark"
              effect="solid"
              getContent={dataTip => dataTip}
            />
          </label>
          <FontAwesomeIcon
            className="label-wrapper__icon"
            icon="info-circle"
            size="sm"
            data-for="is-public-icon"
            data-tip="Your dashboard will be accessible to all of the people<br/>who you share this link with"
          />
          <ReactTooltip
            id="is-public-icon"
            place="top"
            type="dark"
            effect="solid"
            html={true}
            getContent={dataTip => dataTip}
          />
        </div>
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
  } = state.dashboardInfo.settings;
  const { is_public } = state.dashboardInfo;
  return {
    palette,
    colors,
    picker,
    dryRun,
    isPublic: is_public
  };
};

const mapDispatchToProps = {
  selectPalette,
  changeColors,
  changePickerColors,
  toggleDryRun,
  toggleIsPublic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDashboard);
