import React from 'react';
import { connect } from 'react-redux';
import { closeSettings } from '../../actions/rootActions';
import EditorDashboardTopBar from '../../builder/components/EditorDashboardTopBar';
import EditorTopToolbar from './EditorTopToolbar';
import ShareDashboard from '../../builder/components/ShareDashboard';
import EmbedDashboard from '../../builder/components/EmbedDashboard';
import EditorDashboard from './EditorDashboard';

const EditorContainer = props => {
  const { version, dashboardsMenu, isDashboardPublic } = props;
  return (
    <div
      className={
        version === 'editor'
          ? 'dashboard-container'
          : 'dashboard-container-viewer'
      }
      onMouseDown={props.closeSettings}
    >
      {dashboardsMenu === 'share' && <ShareDashboard />}
      {dashboardsMenu === 'embed' && <EmbedDashboard />}
      <EditorDashboardTopBar version={version} editable={!isDashboardPublic} />
      <div
        className="dashboard-inner-container"
      >
      <EditorTopToolbar
        version={version}
        isDashboardPublic={isDashboardPublic}
      />
      <EditorDashboard
        version={version}
        isDashboardPublic={isDashboardPublic}
      />
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  const { screenSize, dashboardsMenu } = state;
  return {
    screenSize,
    dashboardsMenu
  };
};

const mapDispatchToProps = {
  closeSettings
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(EditorContainer);
