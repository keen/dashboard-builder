/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import {
  selectChoroplethMap,
  showChoroplethBorder,
  selectChoroplethBorderSize,
  showChoroplethSliders
} from '../../actions/rootActions';
import Select from 'react-select';

const mapChoroplethOptions = [
  { value: 'world', label: 'World' },
  { value: 'us', label: 'United States' }
];

const choroplethBorderSizeOptions = [];
for (let i = 1; i < 11; i++) {
  choroplethBorderSizeOptions.push({
    value: Number(`0.${i}`),
    label: `0.${i}px`
  });
}

const showChoroplethBordersOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const showChoroplethSlidersOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const SettingsChoropleth = props => {
  const {
    type,
    mapChoropleth,
    borderChoropleth,
    borderSizeChoropleth,
    slidersChoropleth,
    settingsVisible
  } = props;
  const borderChoroplethProp = borderChoropleth || {
    value: true,
    label: 'Yes'
  };
  if (type === 'choropleth') {
    return (
      <React.Fragment>
        <h4>Map</h4>
        <Select
          defaultValue={{ value: 'world', label: 'World' }}
          value={mapChoropleth}
          onChange={e => props.selectChoroplethMap(e, settingsVisible)}
          options={mapChoroplethOptions}
        />
        <h4>Show borders</h4>
        <Select
          defaultValue={{ value: true, label: 'Yes' }}
          value={borderChoroplethProp}
          onChange={e => props.showChoroplethBorder(e, settingsVisible)}
          options={showChoroplethBordersOptions}
        />
        {borderChoroplethProp.value && (
          <React.Fragment>
            <h4>Border size</h4>
            <Select
              defaultValue={{ value: 0.5, label: '0.5px' }}
              value={borderSizeChoropleth}
              onChange={e =>
                props.selectChoroplethBorderSize(e, settingsVisible)
              }
              options={choroplethBorderSizeOptions}
            />
          </React.Fragment>
        )}
        <h4>Show sliders</h4>
        <Select
          defaultValue={{ value: false, label: 'No' }}
          value={slidersChoropleth}
          onChange={e => props.showChoroplethSliders(e, settingsVisible)}
          options={showChoroplethSlidersOptions}
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
  selectChoroplethMap,
  showChoroplethBorder,
  selectChoroplethBorderSize,
  showChoroplethSliders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChoropleth);
