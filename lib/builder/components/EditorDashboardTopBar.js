import React from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage
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
  const { id } = props;
  return (
    <div className="dashboard-top-bar">
      <div className="share" data-for="share-icon" data-tip="Preview">
        <Link to={`/viewer/${id}`}>
          <FontAwesomeIcon icon="share-alt" />
        </Link>
      </div>
      <ReactTooltip
        id="share-icon"
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
    dashboardInfo: { id }
  } = state;
  return {
    id
  };
};

const mapDispatchToProps = dispatch => ({
  saveDashboard: id => dispatch(saveDashboard(id)),
  hideSavedDashboardMessage: () => dispatch(hideSavedDashboardMessage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboardTopBar);
