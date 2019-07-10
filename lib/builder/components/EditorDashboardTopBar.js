import React from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage,
  toogleDashboardsMenu,
} from "../../actions/rootActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import ShareDashboard from './ShareDashboard';

const EditorDashboardTopBar = props => {
  const saveDashboardHandler = id => {
    props.saveDashboard(id);
    setTimeout(() => {
      props.hideSavedDashboardMessage();
    }, 2000);
  };
  const { id, dashboardsMenu } = props;
  const handleIconClick = (e) => {
    props.toogleDashboardsMenu('share');
  }
  return (
    <div className="dashboard-top-bar">
      <div className="share" data-for="share-icon" data-tip="Share" onClick={handleIconClick}>
        <FontAwesomeIcon icon="share-alt" />
      </div>
      { dashboardsMenu === 'share' && <ShareDashboard/> }
      <ReactTooltip
        id="share-icon"
        place="bottom"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
      <div className="preview" data-for="preview-icon" data-tip="Preview">
        <Link to={`/viewer/${id}`}>
          <FontAwesomeIcon icon="eye" />
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
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id },
    dashboardsMenu,
  } = state;
  return {
    id,
    dashboardsMenu
  };
};

const mapDispatchToProps = dispatch => ({
  saveDashboard: id => dispatch(saveDashboard(id)),
  hideSavedDashboardMessage: () => dispatch(hideSavedDashboardMessage()),
  toogleDashboardsMenu: (value) => dispatch(toogleDashboardsMenu(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);
