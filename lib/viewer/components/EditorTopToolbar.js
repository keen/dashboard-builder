import React from "react";
import { connect } from "react-redux";
import {
  saveDashboard,
  hideSavedDashboardMessage
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import EditorTopToolbarTitle from "./EditorTopToolbarTitle";

const EditorTopToolbar = props => {
  const saveDashboardHandler = id => {
    props.saveDashboard(id);
    setTimeout(() => {
      props.hideSavedDashboardMessage();
    }, 2000);
  };
  const { id, version } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle version={version} />
      {version === "editor" ? (
        <React.Fragment>
          <div className="share">
            <Link to={`/viewer/${id}`}>
              <FontAwesomeIcon icon="share-alt" />
            </Link>
          </div>
          <div
            className="save-dashboard-button"
            onClick={() => saveDashboardHandler(id)}
          >
            <FontAwesomeIcon icon="save" /> Save
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to={`/editor/${id}`}>
            <div className="edit-dashboard-button">
              <FontAwesomeIcon icon="cog" /> Edit
            </div>
          </Link>
        </React.Fragment>
      )}
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
)(EditorTopToolbar);
