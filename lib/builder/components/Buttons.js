import React from "react";
import { connect } from "react-redux";
import {
  deleteChart,
  showSettings,
  closeSettings,
  cloneChart
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

const ChartButtons = props => {
  const showSettings = e => {
    e.stopPropagation();
    props.closeSettings();
    setTimeout(() => {
      props.showSettings(props.index);
    }, 0);
  };
  const { index, isMoving, isResizing } = props;
  let buttonsVisibility = "";
  if (isMoving === index) {
    buttonsVisibility = "visible";
  }
  if (isResizing !== false) {
    buttonsVisibility = "hidden";
  }
  return (
    <React.Fragment>
      <div className="config-buttons" style={{ visibility: buttonsVisibility }}>
        <div
          data-for="settings"
          data-tip="Settings"
          onClick={e => showSettings(e)}
        >
          <FontAwesomeIcon icon="cog" />
        </div>
        <div
          data-for="clone"
          data-tip="Clone"
          onClick={() => props.cloneChart(index)}
        >
          <FontAwesomeIcon icon="clone" />
        </div>
        <div
          data-for="delete"
          data-tip="Delete"
          onClick={() => props.deleteChart(index)}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </div>
      </div>
      <ReactTooltip
        id="settings"
        place="top"
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
        id="delete"
        place="bottom"
        type="dark"
        effect="solid"
        getContent={dataTip => dataTip}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { isMoving, isResizing } = state;
  return {
    isMoving,
    isResizing
  };
};

const mapDispatchTopProps = dispatch => ({
  deleteChart: index => dispatch(deleteChart(index)),
  showSettings: index => dispatch(showSettings(index)),
  closeSettings: () => dispatch(closeSettings()),
  cloneChart: index => dispatch(cloneChart(index))
});

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(ChartButtons);
