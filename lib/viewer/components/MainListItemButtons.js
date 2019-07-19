import React from "react";
import { connect } from "react-redux";
import { deleteDashboardItem } from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from 'react-tooltip';

const MainListItemButtons = ({ deleteDashboardItem, id }) => {
  return (
    <div data-for="enrich" data-tip="Delete dashboard" className="dashboard-list-item-buttons">
      <div onClick={() => deleteDashboardItem(id)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
      <ReactTooltip id="enrich" place="top" type="dark" effect="solid" getContent={dataTip => dataTip} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteDashboardItem: id => dispatch(deleteDashboardItem(id))
});

export default connect(
  null,
  mapDispatchToProps
)(MainListItemButtons);
