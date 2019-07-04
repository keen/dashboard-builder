import React from "react";
import { connect } from "react-redux";
import { setSrcForImg } from "../../actions/rootActions";

const SettingsImage = props => {
  const setSrcForImg = e => {
    props.setSrcForImg(e.target.value, props.settingsVisible);
  };
  return (
    <React.Fragment>
      <h4>Image url:</h4>
      <input
        onChange={e => setSrcForImg(e)}
        className="settings-input"
        defaultValue={props.src}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: { dashboardData }
  } = state;
  return {
    settingsVisible,
    src: dashboardData[settingsVisible].src
  };
};

const mapDispatchTopProps = dispatch => ({
  setSrcForImg: (value, index) => dispatch(setSrcForImg(value, index))
});

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(SettingsImage);
