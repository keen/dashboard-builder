import React from "react";
import { connect } from "react-redux";
import {
  addDashboardItem,
  handleSearch
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainTopToolbar = props => {
  const { version } = props;
  return (
    <div className="top-toolbar">
      {version === "editor" && (
        <div className="new-dashboard-button" onClick={props.addDashboardItem}>
          <FontAwesomeIcon icon="plus-circle" /> New dashboard
        </div>
      )}
      <div className="search">
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          placeholder="Search"
          onChange={e => props.handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

const mapDispatchTopProps = dispatch => ({
  addDashboardItem: () => dispatch(addDashboardItem()),
  handleSearch: value => dispatch(handleSearch(value))
});

export default connect(
  null,
  mapDispatchTopProps
)(MainTopToolbar);
