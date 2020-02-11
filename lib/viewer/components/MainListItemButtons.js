import React from 'react';
import { connect } from 'react-redux';
import { deleteDashboardItem } from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const MainListItemButtons = ({ deleteDashboardItem, id }) => {
  const handleIconClick = () => {
    const approvalDelDash = confirm('Do You want to delete this dashboard?');
    if (approvalDelDash) {
      ReactTooltip.hide();
      deleteDashboardItem(id);
    }
  };

  return (
    <div
      data-for="enrich"
      data-tip="Delete dashboard"
      className="dashboard-list-item-buttons"
    >
      <div onClick={() => handleIconClick()}>
        <FontAwesomeIcon icon="trash-alt" size="sm" />
      </div>
      <ReactTooltip
        id="enrich"
        place="top"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
    </div>
  );
};

const mapDispatchToProps = {
  deleteDashboardItem
};

export default connect(null, mapDispatchToProps)(MainListItemButtons);
