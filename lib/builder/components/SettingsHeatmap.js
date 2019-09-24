import React from 'react';
import { connect } from 'react-redux';
import {
  showHeatmapSliders,
  showHeatmapTooltipValue
} from '../../actions/rootActions';
import Select from 'react-select';

const showHeatmapSlidersOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const showHeatmapTooltipValueOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const SettingsHeatmap = props => {
  const { type, settingsVisible, slidersHeatmap, heatmapTooltipValue } = props;
  if (type === 'heatmap') {
    return (
      <React.Fragment>
        <h4>Heatmap</h4>
        <h4>Show sliders</h4>
        <Select
          defaultValue={{ value: false, label: 'No' }}
          value={slidersHeatmap}
          onChange={e => props.showHeatmapSliders(e, settingsVisible)}
          options={showHeatmapSlidersOptions}
        />
        <h4>Show simple tooltip</h4>
        <Select
          defaultValue={{ value: false, label: 'No' }}
          value={heatmapTooltipValue}
          onChange={e => props.showHeatmapTooltipValue(e, settingsVisible)}
          options={showHeatmapTooltipValueOptions}
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
  showHeatmapSliders,
  showHeatmapTooltipValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsHeatmap);
