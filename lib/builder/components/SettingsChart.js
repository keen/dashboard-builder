import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savedQueryError, changeChartType } from '../../actions/rootActions';
import Select from 'react-select';
import SavedQueriesSelect from './SavedQueriesSelect';
import ChartTypeUtils from '../../func/ChartType';
import { client } from 'Client/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import SettingsLegendPosition from './SettingsLegendPosition';
import SettingsSparkline from './SettingsSparkline';
import SettingsStacking from './SettingsStacking';
import SettingsMetric from './SettingsMetric';
import SettingsPoints from './SettingsPoints';
import SettingsChoropleth from './SettingsChoropleth';
import SettingsHeatmap from './SettingsHeatmap';

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
      client
        .get({
          url: client.url('queries', 'saved', props.items.savedQuery[0].value),
          api_key: client.masterKey()
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
      _.isEqual(nextProps.items.savedQuery, this.props.items.savedQuery) ===
        false ||
      nextProps.items.savedQuery.length === 0
    ) {
      this.generateSettings(nextProps);
      this.setState({
        type: nextProps.items.type
      });
    }
  }

  render() {
    const {
      settingsVisible,
      items: {
        savedQuery,
        sparkline,
        stacking,
        legend,
        prefix,
        suffix,
        showPoints,
        pointsSize,
        mapChoropleth,
        borderChoropleth,
        borderSizeChoropleth,
        slidersChoropleth,
        slidersHeatmap,
        heatmapTooltipValue
      },
      isLoading
    } = this.props;

    const {
      results,
      loading,
      type,
      chartTypeForSelect,
      availableChartTypes
    } = this.state;

    return (
      <div className="settings-chart">
        <React.Fragment>
          <h4>Saved Query</h4>
          <SavedQueriesSelect
            value={savedQuery}
            index={settingsVisible}
            type={type}
          />
          {savedQuery.length !== 0 && (
            <React.Fragment>
              <h4>Chart type</h4>
              <Select
                value={chartTypeForSelect}
                onChange={e =>
                  this.props.changeChartType(e.value, settingsVisible)
                }
                options={availableChartTypes}
              />
              <SettingsLegendPosition
                results={results}
                type={type}
                legend={legend}
                sparkline={sparkline}
                savedQuery={savedQuery}
              />
              <SettingsSparkline
                results={results}
                type={type}
                sparkline={sparkline}
              />
              <SettingsStacking
                results={results}
                type={type}
                stacking={stacking}
              />
              <SettingsMetric type={type} prefix={prefix} suffix={suffix} />
              <SettingsPoints
                type={type}
                showPoints={showPoints}
                pointsSize={pointsSize}
              />
              <SettingsChoropleth
                type={type}
                mapChoropleth={mapChoropleth}
                borderChoropleth={borderChoropleth}
                borderSizeChoropleth={borderSizeChoropleth}
                slidersChoropleth={slidersChoropleth}
              />
              <SettingsHeatmap
                type={type}
                slidersHeatmap={slidersHeatmap}
                heatmapTooltipValue={heatmapTooltipValue}
              />
            </React.Fragment>
          )}
        </React.Fragment>
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
      data: { items }
    },
    isLoading
  } = state;
  return {
    settingsVisible,
    items: items[settingsVisible],
    isLoading
  };
};

const mapDispatchToProps = {
  savedQueryError,
  changeChartType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChart);
