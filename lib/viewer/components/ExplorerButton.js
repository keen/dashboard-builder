import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const ExplorerButton = ({ savedQuery }) => {
  const { origin, pathname } = window.location;
  const openNewTab = () => {
    savedQuery.forEach(element => {
      window.open(
        `${origin}${pathname}explorer?saved_query=${element.value}`,
        '_blank'
      );
    });
  };
  return (
    <div className="explorer-button">
      <FontAwesomeIcon
        icon="external-link-alt"
        size="sm"
        data-for="explorer"
        data-tip="Edit saved query in Explorer"
        onClick={openNewTab}
      />
      <ReactTooltip
        id="explorer"
        place="top"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
    </div>
  );
};

export default ExplorerButton;
