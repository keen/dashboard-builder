import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import EditorTopToolbarTitle from "./EditorTopToolbarTitle";

const EditorTopToolbar = props => {
  const { id, version } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle version={version} />
      {version === "viewer" && (
        <React.Fragment>
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
    dashboardInfo: { id }
  } = state;
  return {
    id
  };
};

export default connect(mapStateToProps)(EditorTopToolbar);
