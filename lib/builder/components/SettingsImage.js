import React from "react";
import { connect } from "react-redux";
import { setSrcForImg } from "../../actions/rootActions";

const SettingsImage = props => {
  const setSrcForImg = e => {
    props.setSrcForImg(e.target.value, props.settingsVisible);
  };
  return (
    <div className="settings-chart">
      <h4>Image url</h4>
      <input
        onChange={e => setSrcForImg(e)}
        className="settings-input"
        defaultValue={props.src}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: {
      data: { items }
    }
  } = state;
  return {
    settingsVisible,
    src: items[settingsVisible].src
  };
};

const mapDispatchTopProps = dispatch => ({
  setSrcForImg: (value, index) => dispatch(setSrcForImg(value, index))
});

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(SettingsImage);
