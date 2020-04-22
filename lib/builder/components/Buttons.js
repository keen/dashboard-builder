import React from 'react';
import { connect } from 'react-redux';
import {
  deleteChart,
  showSettings,
  closeSettings,
  cloneChart
} from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const ChartButtons = props => {
  const { index, editedWidget, savedQuery } = props;
  const showSettings = e => {
    e.stopPropagation();
    props.showSettings(index);
  };
  const { origin, pathname } = window.location;
  const openNewTab = () => {
    savedQuery.forEach(element => {
      window.open(
        `${origin}${pathname}explorer?saved_query=${element.value}`,
        '_blank'
      );
    });
  };
  let opacity;
  if (editedWidget === index) {
    opacity = '0';
  }
  return (
    <React.Fragment>
      <div className="config-buttons" style={{ opacity }}>
        <div
          data-for="settings"
          data-tip="Settings"
          onMouseDown={e => showSettings(e)}
        >
          <FontAwesomeIcon icon="cog" size="sm" />
        </div>
        <div
          data-for="clone"
          data-tip="Clone"
          onClick={() => props.cloneChart(index)}
        >
          <FontAwesomeIcon icon="clone" size="sm" />
        </div>
        {savedQuery && savedQuery.length > 0 && (
          <div
            data-for="explorer"
            data-tip="Edit saved query in Explorer"
            onClick={openNewTab}
          >
            <FontAwesomeIcon icon="external-link-alt" size="sm" />
          </div>
        )}
        <div
          data-for="delete"
          data-tip="Delete"
          onClick={e => {
            e.stopPropagation();
            props.deleteChart(index);
          }}
        >
          <FontAwesomeIcon icon="trash-alt" size="sm" />
        </div>
      </div>
      <ReactTooltip
        id="settings"
        place="left"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
      <ReactTooltip
        id="clone"
        place="left"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
      <ReactTooltip
        id="explorer"
        place="left"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
      <ReactTooltip
        id="delete"
        place="left"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { isMoving, isResizing } = state.app;
  return {
    isMoving,
    isResizing
  };
};

const mapDispatchTopProps = {
  deleteChart,
  showSettings,
  closeSettings,
  cloneChart
};

export default connect(mapStateToProps, mapDispatchTopProps)(ChartButtons);
