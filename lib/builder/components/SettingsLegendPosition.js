/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import { selectLegendPosition } from '../../actions/rootActions';
import Select from 'react-select';

const legendPositions = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: false, label: 'Hidden' }
];

const SettingsLegendPosition = props => {
  const {
    settingsVisible,
    results,
    savedQuery,
    sparkline,
    type,
    legend
  } = props;
  if (
    results &&
    (results.query.group_by || savedQuery.length > 1) &&
    !sparkline.value &&
    type !== 'table' &&
    type !== 'choropleth' &&
    type !== 'heatmap'
  ) {
    return (
      <React.Fragment>
        <h4>Legend</h4>
        <Select
          value={legend}
          onChange={e => props.selectLegendPosition(e, settingsVisible)}
          options={legendPositions}
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
  selectLegendPosition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsLegendPosition);
