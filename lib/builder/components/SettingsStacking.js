import React from 'react';
import { connect } from 'react-redux';
import { selectStackingOption } from '../../actions/rootActions';
import Select from 'react-select';

const stackingOptions = [
  { value: '', label: 'None' },
  { value: 'normal', label: 'Normal' },
  { value: 'percent', label: 'Percent' }
];

const SettingsStacking = props => {
  const { results, type, stacking, settingsVisible } = props;

  if (
    results &&
    results.query.group_by &&
    type !== 'table' &&
    type !== 'pie' &&
    type !== 'choropleth'
  ) {
    return (
      <React.Fragment>
        <h4>Stacking</h4>
        <Select
          value={stacking}
          onChange={e => props.selectStackingOption(e, settingsVisible)}
          options={stackingOptions}
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
  selectStackingOption
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsStacking);
