import React from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage,
  toogleDashboardsMenu,
  changeScreenSize
} from "../../actions/rootActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const EditorDashboardTopBar = props => {
  const saveDashboardHandler = () => {
    props.saveDashboard(props.dashboardInfo);
    setTimeout(() => {
      props.hideSavedDashboardMessage();
    }, 2000);
  };
  const { dashboardInfo, version, screenSize, editable } = props;
  const handleIconClick = e => {
    props.toogleDashboardsMenu("share");
  };
  return (
    <div className="dashboard-top-bar">
      {version === "editor" ? (
        <React.Fragment>
          <div className="share">
            <div
              className="share-icon"
              data-for="share-icon"
              data-tip="Share"
              onClick={handleIconClick}
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
                onClick={() => props.saveDashboard()}
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
              onClick={() => props.changeScreenSize("mobile")}
            />
            <FontAwesomeIcon
              icon="tablet-alt"
              data-for="screen-size"
              data-tip="Tablet"
              style={{ color: screenSize === "tablet" && "#000" }}
              onClick={() => props.changeScreenSize("tablet")}
            />
            <FontAwesomeIcon
              icon="laptop"
              data-for="screen-size"
              data-tip="Desktop"
              style={{ color: screenSize === "desktop" && "#000" }}
              onClick={() => props.changeScreenSize("desktop")}
            />
          </div>
          <ReactTooltip
            id="screen-size"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={dataTip => dataTip}
          />
          {editable && <Link to={`/editor/${dashboardInfo.id}`}>
            <div className="edit-dashboard-button">
              <FontAwesomeIcon icon="edit" /> Edit
            </div>
          </Link>}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo,
    dashboardsMenu,
    screenSize
  } = state;
  return {
    dashboardInfo,
    dashboardsMenu,
    screenSize
  };
};

const mapDispatchToProps = dispatch => ({
  saveDashboard: () => dispatch(saveDashboard()),
  hideSavedDashboardMessage: () => dispatch(hideSavedDashboardMessage()),
  toogleDashboardsMenu: value => dispatch(toogleDashboardsMenu(value)),
  changeScreenSize: value => dispatch(changeScreenSize(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);

EditorDashboardTopBar.defaultProps = {
  editable: true
};