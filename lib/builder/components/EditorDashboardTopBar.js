import React from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage,
  changeScreenSize
} from "../../actions/rootActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const EditorDashboardTopBar = props => {
  const saveDashboardHandler = id => {
    props.saveDashboard(id);
    setTimeout(() => {
      props.hideSavedDashboardMessage();
    }, 2000);
  };
  const { id, version, screenSize } = props;
  return (
    <div className="dashboard-top-bar">
      {version === 'editor' ? (
        <React.Fragment>
          <div className="preview" data-for="preview-icon" data-tip="Preview">
            <Link to={`/viewer/${id}`}>
              <FontAwesomeIcon icon="eye" onClick={() => props.saveDashboard(id)} />
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
            onClick={() => saveDashboardHandler(id)}
          >
            <FontAwesomeIcon icon="save" /> Save
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="screen-resize-icon">
            <FontAwesomeIcon
              icon="mobile-alt" data-for="screen-size" data-tip="Mobile"
              style={{ color: screenSize === "mobile" && "#000" }}
              onClick={() => props.changeScreenSize("mobile")}
            />
            <FontAwesomeIcon
              icon="tablet-alt" data-for="screen-size" data-tip="Tablet"
              style={{ color: screenSize === "tablet" && "#000" }}
              onClick={() => props.changeScreenSize("tablet")}
            />
            <FontAwesomeIcon
              icon="laptop" data-for="screen-size" data-tip="Desktop"
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
          <Link to={`/editor/${id}`}>
            <div className="edit-dashboard-button">
              <FontAwesomeIcon icon="edit" /> Edit
            </div>
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id },
    screenSize
  } = state;
  return {
    id,
    screenSize
  };
};

const mapDispatchToProps = dispatch => ({
  saveDashboard: id => dispatch(saveDashboard(id)),
  hideSavedDashboardMessage: () => dispatch(hideSavedDashboardMessage()),
  changeScreenSize: value => dispatch(changeScreenSize(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);
