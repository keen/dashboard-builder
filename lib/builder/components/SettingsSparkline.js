import React from 'react';
import { connect } from 'react-redux';
import { selectSparklineOption } from '../../actions/rootActions';
import Select from 'react-select';

const sparklineOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const SettingsSparkline = props => {
  const { type, results, sparkline, settingsVisible } = props;
  if (
    type !== 'table' &&
    type !== 'metric' &&
    (type && !type.includes('funnel')) &&
    results &&
    type !== 'choropleth'
  ) {
    return (
      <React.Fragment>
        <h4>Sparkline</h4>
        <Select
          value={sparkline}
          onChange={e => props.selectSparklineOption(e, settingsVisible)}
          options={sparklineOptions}
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
  selectSparklineOption
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsSparkline);
