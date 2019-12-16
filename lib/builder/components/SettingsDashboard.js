import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDryRun,
  toggleIsPublic,
  setTheme
} from '../../actions/rootActions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Builder from 'keen-theme-builder';
import Switcher from './Switcher';
import ReactTooltip from 'react-tooltip';
import debounce from 'lodash/debounce';

const SettingsDashboard = props => {
  const builderOnChange = data => {
    debounce(props.setTheme(data), 500);
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Theme</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanel className="settings-theme-builder">
        <Builder
          key={props.id}
          isDashboardBuilderActive
          onChange={builderOnChange}
          containerId={`dashboard-${props.id}`}
          options={props.theme ? props.theme.theme : {}}
        />
      </TabPanel>
      <TabPanel>
        <Switcher checked={!!props.isPublic} onChange={props.toggleIsPublic}>
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
          <span data-for="is-public" data-tip="Make your dashboard shareable">
            Is Public
          </span>
          <ReactTooltip
            id="is-public"
            place="top"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </Switcher>
        <Switcher checked={!!props.dryRun} onChange={props.toggleDryRun}>
          <span
            data-for="dry-run"
            data-tip="Prototype your dashboard with a dummy data"
          >
            Dry run
          </span>
          <ReactTooltip
            id="dry-run"
            place="top"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </Switcher>
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = state => {
  const {
    dryRun,
    theme
  } = state.dashboardInfo.settings;
  const { is_public, id } = state.dashboardInfo;
  return {
    dryRun,
    theme,
    id,
    isPublic: is_public
  };
};

const mapDispatchToProps = {
  toggleDryRun,
  toggleIsPublic,
  setTheme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDashboard);
