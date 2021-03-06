/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  savedQueryError,
  changeChartType,
  setChartTheme
} from '../../actions/rootActions';
import Select from 'react-select';
import SavedQueriesSelect from './SavedQueriesSelect';
import Explorer from './Explorer';
import ChartTypeUtils from '../../func/ChartType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import Builder from 'keen-theme-builder';

class SettingsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      loading: false,
      type: '',
      chartTypeForSelect: {},
      availableChartTypes: []
    };
  }

  generateSettings = props => {
    if (props.items.savedQuery[0]) {
      this.setState({
        loading: true
      });
      this.props.keenAnalysis
        .get({
          url: this.props.keenAnalysis.url(
            'queries',
            'saved',
            props.items.savedQuery[0].value
          ),
          api_key: this.props.keenAnalysis.masterKey()
        })
        .then(results => {
          const newType = ChartTypeUtils.getChartTypeOptions(results.query);
          const type = props.items.type ? props.items.type : newType[0];
          this.setState({
            results,
            type,
            loading: false
          });
          if (this.state.type) {
            const { type, results } = this.state;
            this.props.changeChartType(type, this.props.settingsVisible);
            const typeForSelect = item => {
              const label = item.replace('-', ' ');
              return label.charAt(0).toUpperCase() + label.slice(1);
            };

            const chartList =
              results &&
              ChartTypeUtils.getChartTypeOptions(results.query).map(value => {
                return {
                  value,
                  label: typeForSelect(value)
                };
              });

            const chartListFiltered = chartList.filter(
              el =>
                el.value &&
                (el.value.includes('area') || el.value.includes('line'))
            );

            const availableChartTypes =
              props.items.savedQuery.length > 1 ? chartListFiltered : chartList;

            const chartTypeForSelect = {
              value: type,
              label: typeForSelect(type)
            };

            this.setState({
              chartTypeForSelect,
              availableChartTypes
            });
          }
        })
        .catch(({ body: err }) => {
          props.savedQueryError(err, props.settingsVisible);
          this.setState({
            loading: false
          });
        });
    }
    this.setState({
      type: props.items.type
    });
  };

  componentDidMount() {
    if (this.props.items.savedQuery) {
      this.generateSettings(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.settingsVisible !== nextProps.settingsVisible ||
      nextProps.items.type !== this.props.items.type ||
      isEqual(nextProps.items.savedQuery, this.props.items.savedQuery) ===
        false ||
      nextProps.items.savedQuery.length === 0
    ) {
      this.generateSettings(nextProps);
      this.setState({
        type: nextProps.items.type
      });
    }
  }

  builderChartStyle = debounce(data => {
    this.props.setChartTheme(this.props.settingsVisible, data);
  }, 500);

  render() {
    const {
      settingsVisible,
      items: { savedQuery },
      isLoading,
      id,
      theme,
      charts_theme,
      querySource
    } = this.props;

    const {
      results,
      loading,
      type,
      chartTypeForSelect,
      availableChartTypes
    } = this.state;
    const builderOptions = {
      chart: type
    };

    return (
      <div className="settings-chart">
        {querySource === 'explorer' && <Explorer />}
        <div className="settings-chart-saved-query">
          {!querySource && (
            <>
              <h4>Saved Query</h4>
              <SavedQueriesSelect
                value={savedQuery}
                index={settingsVisible}
                type={type}
              />
            </>
          )}
          {savedQuery && savedQuery.length !== 0 && (
            <>
              <h4>Chart type</h4>
              <Select
                value={chartTypeForSelect}
                onChange={e =>
                  this.props.changeChartType(e.value, settingsVisible)
                }
                options={availableChartTypes}
              />
            </>
          )}
        </div>
        {savedQuery.length !== 0 && (
          <Builder
            options={
              charts_theme &&
              charts_theme[settingsVisible] !== undefined &&
              charts_theme[settingsVisible] !== null
                ? {
                    ...charts_theme[settingsVisible].theme,
                    ...builderOptions
                  }
                : theme
                ? { ...theme.theme, ...builderOptions }
                : {}
            }
            isDashboardBuilderActive
            onChange={this.builderChartStyle}
            containerId={settingsVisible}
          />
        )}
        {(loading || isLoading === settingsVisible) && (
          <div className="settings-loading">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" size="lg" />
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: {
      id,
      settings: { theme, charts_theme, items }
    },
    isLoading
  } = state.app;
  return {
    id,
    settingsVisible,
    items: items.find(item => item.i === settingsVisible),
    isLoading,
    theme,
    charts_theme
  };
};

const mapDispatchToProps = {
  savedQueryError,
  changeChartType,
  setChartTheme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChart);
