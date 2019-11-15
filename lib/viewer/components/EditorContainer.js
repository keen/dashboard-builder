import React from 'react';
import { connect } from 'react-redux';
import { closeSettings } from '../../actions/rootActions';
import EditorDashboardTopBar from '../../builder/components/EditorDashboardTopBar';
import EditorTopToolbar from './EditorTopToolbar';
import EditorDashboard from './EditorDashboard';
import ShareDashboard from '../../builder/components/ShareDashboard';
import EmbedDashboard from '../../builder/components/EmbedDashboard';
import NewEditorDashboard from './NewEditorDashboard';

const EditorContainer = props => {
  const { version, screenSize, dashboardsMenu, isDashboardPublic } = props;
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
        style={{
          width:
            screenSize === 'desktop' || version === 'editor'
              ? '1200px'
              : screenSize === 'tablet'
              ? '800px'
              : '420px'
        }}
      >
        <EditorTopToolbar
          version={version}
          isDashboardPublic={isDashboardPublic}
        />
        <EditorDashboard
          version={version}
          isDashboardPublic={isDashboardPublic}
        />
        {/* <NewEditorDashboard/> */}
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
