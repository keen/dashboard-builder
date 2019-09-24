import React from 'react';
import { connect } from 'react-redux';
import { setPrefix, setSuffix } from '../../actions/rootActions';

const SettingsMetric = props => {
  const { type, settingsVisible, prefix, suffix } = props;
  if (type === 'metric') {
    return (
      <React.Fragment>
        <h4>Prefix value</h4>
        <input
          onChange={e => props.setPrefix(e, settingsVisible)}
          className="settings-input"
          defaultValue={prefix}
        />
        <h4>Suffix value</h4>
        <input
          onChange={e => props.setSuffix(e, settingsVisible)}
          className="settings-input"
          defaultValue={suffix}
        />
      </React.Fragment>
    );
  }
  return null;
};

const mapStateToProps = state => {
  const { settingsVisible } = state;
  return {
    settingsVisible
  };
};

const mapDispatchToProps = {
  setPrefix,
  setSuffix
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMetric);
