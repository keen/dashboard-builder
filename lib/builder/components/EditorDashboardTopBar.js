import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage,
  toggleDashboardsMenu,
  changeScreenSize,
  makeDashboardPublicAndSave
} from "../../actions/rootActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const EditorDashboardTopBar = props => {
  useEffect(() => {
    const clientWidth = document.body.clientWidth || 1200;
    switch (true) {
      case clientWidth <= 420:
        changeScreenSize("mobile");
        break;
      case (clientWidth <= 800 && clientWidth > 420):
        changeScreenSize("tablet");
        break;
      default:
        changeScreenSize("desktop");
        break;
    }
  }, []);
  
  const {
    dashboardInfo,
    version,
    screenSize,
    saveDashboard,
    hideSavedDashboardMessage,
    toggleDashboardsMenu,
    changeScreenSize,
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
    toggleDashboardsMenu("share");
    makeDashboardPublicAndSave(dashboardInfo);
    hideSavedDashboardMessageHandler();
  }
  const handleEmbedIconClick = () => {
    toggleDashboardsMenu("embed");
    makeDashboardPublicAndSave(dashboardInfo);
    hideSavedDashboardMessageHandler();
  }

  return (
    <div className="dashboard-top-bar">
      {version === "editor" ? (
        <React.Fragment>
          <div className="embed">
            <div
              className="embed-icon"
              data-for="embed-icon"
              data-tip="Embed"
              onClick={handleEmbedIconClick}
            >
              <FontAwesomeIcon icon="code" />
            </div>
            <ReactTooltip
              id="embed-icon"
              place="bottom"
              type="dark"
              effect="solid"
              getContent={dataTip => dataTip}
            />
          </div>
          <div className="share">
            <div
              className="share-icon"
              data-for="share-icon"
              data-tip="Share"
              onClick={handleShareIconClick}
            >
              <FontAwesomeIcon icon="share-alt" />
            </div>
            <ReactTooltip
              id="share-icon"
              place="bottom"
              type="dark"
              effect="solid"
              getContent={dataTip => dataTip}
            />
          </div>
          <div className="preview" data-for="preview-icon" data-tip="Preview">
            <Link to={`/viewer/${dashboardInfo.id}`}>
              <FontAwesomeIcon
                icon="eye"
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
          <div
            className="save-dashboard-button"
            onClick={() => saveDashboardHandler()}
          >
            <FontAwesomeIcon icon="save" /> Save
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="screen-resize-icon">
            <FontAwesomeIcon
              icon="mobile-alt"
              data-for="screen-size"
              data-tip="Mobile"
              style={{ color: screenSize === "mobile" && "#000" }}
              onClick={() => changeScreenSize("mobile")}
            />
            <FontAwesomeIcon
              icon="tablet-alt"
              data-for="screen-size"
              data-tip="Tablet"
              style={{ color: screenSize === "tablet" && "#000" }}
              onClick={() => changeScreenSize("tablet")}
            />
            <FontAwesomeIcon
              icon="laptop"
              data-for="screen-size"
              data-tip="Desktop"
              style={{ color: screenSize === "desktop" && "#000" }}
              onClick={() => changeScreenSize("desktop")}
            />
          </div>
          <ReactTooltip
            id="screen-size"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
        </React.Fragment>
      )}
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
  changeScreenSize,
  makeDashboardPublicAndSave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);
