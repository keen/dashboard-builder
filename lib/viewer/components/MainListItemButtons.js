import React from "react";
import { connect } from "react-redux";
import { deleteDashboardItem } from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from 'react-tooltip';

const MainListItemButtons = ({ deleteDashboardItem, index }) => {
  return (
    <div data-for="enrich" data-tip="Delete dashboard" className="dashboard-list-item-buttons">
      <div onClick={() => deleteDashboardItem(index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
      <ReactTooltip id="enrich" place="top" type="dark" effect="solid" getContent={dataTip => dataTip} />
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
