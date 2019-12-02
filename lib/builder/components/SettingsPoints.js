/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import { selectShowPoints, selectPointsSize } from '../../actions/rootActions';
import Select from 'react-select';

const showPointsOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const pointsSizeOptions = [];
for (let i = 1; i < 11; i++) {
  pointsSizeOptions.push({ value: i, label: `${i}px` });
}

const SettingsPoints = props => {
  const { type, showPoints, settingsVisible, pointsSize } = props;

  const showPointsValue = showPoints || { value: true, label: 'Yes' };

  if (
    type &&
    (type.includes('line') || (type.includes('area') && !type.includes('step')))
  ) {
    return (
      <React.Fragment>
        <h4>Show points</h4>
        <Select
          defaultValue={showPointsValue}
          value={showPoints}
          onChange={e => props.selectShowPoints(e, settingsVisible)}
          options={showPointsOptions}
        />
        {showPointsValue.value && (
          <React.Fragment>
            <h4>Points size</h4>
            <Select
              defaultValue={{ value: 2, label: '2px' }}
              value={pointsSize}
              onChange={e => props.selectPointsSize(e, settingsVisible)}
              options={pointsSizeOptions}
            />
          </React.Fragment>
        )}
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
  selectShowPoints,
  selectPointsSize
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPoints);
