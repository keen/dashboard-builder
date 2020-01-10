import React from 'react';
import { connect } from 'react-redux';
import { closeSettings } from '../../actions/rootActions';
import EditorDashboardTopBar from '../../builder/components/EditorDashboardTopBar';
import EditorTopToolbar from './EditorTopToolbar';
import ShareDashboard from '../../builder/components/ShareDashboard';
import EmbedDashboard from '../../builder/components/EmbedDashboard';
import EditorDashboard from './EditorDashboard';

import KeenAnalysisContext from '../../contexts/keenAnalysis';

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
      <div className="dashboard-inner-container">
        <EditorTopToolbar
          version={version}
          isDashboardPublic={isDashboardPublic}
        />
        <KeenAnalysisContext.Consumer>
          {client => (
            <EditorDashboard
              keenAnalysis={client}
              version={version}
              isDashboardPublic={isDashboardPublic}
            />
          )}
        </KeenAnalysisContext.Consumer>
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  const { screenSize, dashboardsMenu } = state.app;
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
