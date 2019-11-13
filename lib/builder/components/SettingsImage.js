import React from 'react';
import { connect } from 'react-redux';
import { setSrcForImg } from '../../actions/rootActions';

const SettingsImage = props => {
  const { items, settingsVisible } = props;
  const setSrcForImg = e => {
    props.setSrcForImg(e.target.value, settingsVisible);
  };
  const item = items.find(item => item.i === settingsVisible);
  const imageSrc = (item && item.src) || '';
  return (
    <div className="settings-chart">
      <h4>Image url</h4>
      <input
        onChange={e => setSrcForImg(e)}
        className="settings-input"
        defaultValue={imageSrc}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: {
      settings: { items }
    }
  } = state;
  return {
    settingsVisible,
    items,
  };
};

const mapDispatchTopProps = {
  setSrcForImg
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(SettingsImage);
