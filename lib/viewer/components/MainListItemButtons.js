import React from "react";
import { connect } from "react-redux";
import { deleteDashboardItem } from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainListItemButtons = ({ deleteDashboardItem, index }) => {
  return (
    <div className="dashboard-list-item-buttons">
      <div onClick={() => deleteDashboardItem(index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteDashboardItem: index => dispatch(deleteDashboardItem(index))
});

export default connect(
  null,
  mapDispatchToProps
)(MainListItemButtons);
