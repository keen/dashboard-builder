import React from "react";
import { connect } from "react-redux";
import { deleteChart, showSettings, closeSettings, cloneChart } from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChartButtons = (props) => {
  const showSettings = e => {
    e.stopPropagation();
    props.closeSettings();
    setTimeout(() => {
      props.showSettings(props.index)
    }, 0);
  }
  const {
    index,
    isMoving,
    isResizing,
  } = props;
  let buttonsVisibility = "";
  if (isMoving === index) {
    buttonsVisibility = "visible";
  }
  if (isResizing !== false) {
    buttonsVisibility = "hidden";
  }
  return (
    <div className="config-buttons" style={{ visibility: buttonsVisibility }}>
      <div onClick={(e) => showSettings(e)}>
        <FontAwesomeIcon icon="cog" />
      </div>
      <div onClick={() => props.cloneChart(index)}>
        <FontAwesomeIcon icon="clone" />
      </div>
      <div onClick={() => props.deleteChart(index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isMoving: state.editorReducer.isMoving,
  isResizing: state.editorReducer.isResizing
});

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
