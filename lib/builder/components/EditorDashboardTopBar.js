import React from 'react';
import { connect } from 'react-redux';
import {
  saveDashboard,
  hideSavedDashboardMessage,
  toggleDashboardsMenu,
  makeDashboardPublicAndSave
} from '../../actions/rootActions';
import { Link } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const EditorDashboardTopBar = props => {
  const {
    dashboardInfo,
    version,
    screenSize,
    saveDashboard,
    hideSavedDashboardMessage,
    toggleDashboardsMenu,
    makeDashboardPublicAndSave
  } = props;
  const hideSavedDashboardMessageHandler = () => {
    setTimeout(() => {
      hideSavedDashboardMessage();
    }, 2000);
  };
  const saveDashboardHandler = () => {
    saveDashboard(props.dashboardInfo);
    hideSavedDashboardMessageHandler();
  };
  const handleShareIconClick = () => {
    toggleDashboardsMenu('share');
    makeDashboardPublicAndSave(dashboardInfo);
    hideSavedDashboardMessageHandler();
  };
  const handleEmbedIconClick = () => {
    toggleDashboardsMenu('embed');
    makeDashboardPublicAndSave(dashboardInfo);
    hideSavedDashboardMessageHandler();
  };

  const exportToImage = node => {
    if (!node) return;
    domtoimage.toBlob(node).then(blob => {
      saveAs(blob, 'dashboard.png');
    });
  };

  const dashboardElement = document.getElementById(`dashboard-${dashboardInfo.id}`);

  return (
    <div className="dashboard-top-bar">
      <div className="dashboard-top-bar__breakpoints">
        {version === 'viewer' &&
          <FontAwesomeIcon
            className="export-icon"
            icon="file-download"
            size="lg"
            data-for="screen-size"
            data-tip="Export to PNG"
            onClick={() => exportToImage(dashboardElement)}
          />
        }
        <ReactTooltip
          id="screen-size"
          place="bottom"
          type="dark"
          effect="solid"
          getContent={dataTip => dataTip}
        />
      </div>
      <div className="dashboard-top-bar__menu">
      {version === 'viewer' &&
        <div className="embed">
          <div
            className="embed-icon"
            data-for="embed-icon"
            data-tip="Embed"
            onClick={handleEmbedIconClick}
          >
            <FontAwesomeIcon icon="code" size="lg" />
          </div>
          <ReactTooltip
            id="embed-icon"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </div>
      }
      {version === 'viewer' &&
        <div className="share">
          <div
            className="share-icon"
            data-for="share-icon"
            data-tip="Share"
            onClick={handleShareIconClick}
          >
            <FontAwesomeIcon icon="share-alt" size="lg" />
          </div>
          <ReactTooltip
            id="share-icon"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </div>
      }
      {version === 'editor' &&
        <>
          <div className="preview" data-for="preview-icon" data-tip="Preview">
            <Link to={`/viewer/${dashboardInfo.id}`}>
              <FontAwesomeIcon
                icon="eye"
                size="lg"
                onClick={() => saveDashboard(dashboardInfo)}
              />
            </Link>
          </div>
          <ReactTooltip
            id="preview-icon"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </>
      }
        {version === 'editor' &&
          <button
            className="save-dashboard-button"
            onClick={() => saveDashboardHandler()}
          >
            <FontAwesomeIcon icon="save" size="sm" /> Save
          </button>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { dashboardInfo, dashboardsMenu, screenSize } = state;
  return {
    dashboardInfo,
    dashboardsMenu,
    screenSize
  };
};

const mapDispatchToProps = {
  saveDashboard,
  hideSavedDashboardMessage,
  toggleDashboardsMenu,
  makeDashboardPublicAndSave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);
