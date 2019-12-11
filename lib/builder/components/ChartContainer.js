/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeChartTitle,
  changeChartSubitle,
  loadSavedQuery,
  savedQueryError,
  setLoading
} from '../../actions/rootActions';
import Chart from './Chart';
import CustomChartTheme from './CustomChartTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartTypeUtils from '../../func/ChartType';
import _ from 'lodash';

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: undefined
    };
  }

  runSingleSavedQuery = element => {
    this.setState({
      loading: true
    });
    this.props.keenAnalysis
      .query('saved', element.value)
      .then(results => {
        const newType = ChartTypeUtils.getChartTypeOptions(results.query);
        const type = this.props.type ? this.props.type : newType[0];
        this.props.loadSavedQuery(this.props.index);
        this.setState({
          results:
            this.state.results === undefined
              ? { ...results }
              : Array.isArray(this.state.results)
              ? [...this.state.results, { ...results }]
              : type && (type.includes('area') || type.includes('line'))
              ? [{ ...this.state.results }, { ...results }]
              : { ...results },
          savedQuery: {
            value: results.query_name,
            label: results.metadata.display_name
          },
          type,
          loading: false
        });
        this.props.setLoading(false);
      })
      .catch(({ body: error }) => {
        this.setState({
          error,
          loading: false
        });
        this.props.setLoading(false);
      });
  };

  runMultiSavedQuery = props => {
    this.setState({
      loading: true
    });
    const promises = [];
    props.savedQuery.map(el => {
      promises.push(this.props.keenAnalysis.query('saved', el.value));
    });

    Promise.all(promises)
      .then(results => {
        for (let i = 0; i < results.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (i === j) {
              continue;
            }
            if (
              results[i].query.analysis_type ===
                results[j].query.analysis_type &&
              results[i].query.event_collection ===
                results[j].query.event_collection
            ) {
              results[j].query.analysis_type += j;
            }
          }
        }
        const newType = ChartTypeUtils.getChartTypeOptions(results[0].query);
        const type = newType[0];
        props.loadSavedQuery(props.index);
        this.setState({
          results,
          type: props.type ? props.type : type,
          loading: false
        });
        props.setLoading(false);
      })
      .catch(({ body: error }) => {
        this.setState({
          error,
          loading: false
        });
        props.setLoading(false);
      });
  };

  componentDidMount() {
    if (
      this.props.savedQuery.length &&
      (this.props.dryRun === false || this.props.version === 'viewer')
    ) {
      this.setState({
        loading: true
      });
      if (this.props.savedQuery.length > 1) {
        this.runMultiSavedQuery(this.props);
      } else {
        this.runSingleSavedQuery(this.props.savedQuery[0]);
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.setState({
        results: undefined,
        type: undefined
      });
    }
    this.props.dryRun !== nextProps.dryRun &&
      this.props.id === nextProps.id &&
      this.setState({ results: undefined });
    this.props.id !== nextProps.id && this.setState({ results: undefined });
    _.isEqual(nextProps.savedQuery, this.props.savedQuery) === false ||
      (this.props.id !== nextProps.id && this.setState({ results: undefined }));
    if (
      this.props.id !== nextProps.id ||
      ((this.props.savedQuery &&
        nextProps.dryRun === false &&
        _.isEqual(nextProps.savedQuery, this.props.savedQuery) === false) ||
        ((this.props.savedQuery === false &&
          nextProps.savedQuery &&
          this.props.type !== nextProps.type) ||
          (this.props.dryRun !== nextProps.dryRun &&
            nextProps.dryRun === false &&
            this.props.id === nextProps.id)))
    ) {
      if (nextProps.version === 'viewer' || nextProps.dryRun === false) {
        if (nextProps.savedQuery.length > 1) {
          this.runMultiSavedQuery(nextProps);
        } else {
          nextProps.savedQuery.map(el => {
            this.runSingleSavedQuery(el);
          });
        }
      }
    }
    if (this.props.savedQuery.length !== nextProps.savedQuery.length) {
      this.setState({
        results: undefined
      });
    }
  }

  render() {
    const {
      chartTitle,
      chartSubtitle,
      index,
      legend,
      sparkline,
      stacking,
      isLoading,
      dryRun,
      version,
      error,
      showPoints,
      pointsSize,
      mapChoropleth,
      borderChoropleth,
      borderSizeChoropleth,
      slidersChoropleth,
      slidersHeatmap,
      heatmapTooltipValue,
      template,
      id,
      charts_theme
    } = this.props;
    const { loading, results, type } = this.state;
    if (
      chartTitle === undefined &&
      results &&
      results.metadata &&
      results.metadata.display_name
    ) {
      const displayName = results.metadata.display_name;
      this.props.changeChartTitle(displayName, index);
    }

    const pointSettings = {
      show: showPoints ? !!showPoints.value : true,
      r: pointsSize ? pointsSize.value : 2.5
    };

    const choroplethSettings = {
      map: mapChoropleth ? mapChoropleth.value : 'world',
      borders: {
        show: borderChoropleth ? borderChoropleth.value : true,
        size: borderSizeChoropleth ? borderSizeChoropleth.value : 0.5
      },
      showSlider: slidersChoropleth ? slidersChoropleth.value : false
    };

    const heatmapSettings = {
      showSlider: slidersHeatmap ? slidersHeatmap.value : false,
      simpleTooltip: heatmapTooltipValue ? heatmapTooltipValue.value : false
    };

    const title =
      template && template['title.show'] ? template['title.text'] : false;
    const subtitle =
      template && template['subtitle.show'] ? template['subtitle.text'] : false;
    const legendAlignment =
      template['legend.layout'] === 'top' ||
      template['legend.layout'] === 'bottom'
        ? template['legend.position.horizontal']
        : template['legend.position.vertical'];
    const legendOptions = {
      show: template['legend.show'],
      position: template['legend.layout'],
      alignment: legendAlignment
    };
    const data = template['series.label.show'] ? { labels: true } : false;
    const point = {
      show: template['series.points.show'],
      r: template['series.points.size']
    };
    const chartOptions =
      charts_theme &&
      charts_theme[index] !== undefined &&
      charts_theme[index] !== null
        ? charts_theme[index]
        : {};
    return (
      <React.Fragment>
        {(((version === 'editor' || (version === 'viewer' && chartTitle)) &&
          (chartOptions &&
            chartOptions.theme &&
            chartOptions.theme.title_show)) ||
          (template && template.theme && template.theme.title_show)) && (
          <div className="chart-title">
            <input
              type="text"
              value={chartTitle || ''}
              onChange={e => this.props.changeChartTitle(e.target.value, index)}
              placeholder="Enter your title..."
              readOnly={version === 'viewer'}
            />
          </div>
        )}
        {(((version === 'editor' || (version === 'viewer' && chartSubtitle)) &&
          (chartOptions &&
            chartOptions.theme &&
            chartOptions.theme.subtitle_show)) ||
          (template && template.theme && template.theme.subtitle_show)) && (
          <div className="chart-subtitle">
            <input
              type="text"
              value={chartSubtitle || ''}
              onChange={e =>
                this.props.changeChartSubitle(e.target.value, index)
              }
              placeholder="Enter your subtitle..."
              readOnly={version === 'viewer'}
            />
          </div>
        )}
        {Object.keys(chartOptions).length ? (
          <CustomChartTheme
            theme={chartOptions.theme}
            containerId={this.props.containerId}
          >
            <Chart
              key={id}
              type={type}
              {...this.props}
              {...template.options}
              {...chartOptions.options}
              results={results}
            />
          </CustomChartTheme>
        ) : (
          <Chart
            key={id}
            type={type}
            {...this.props}
            {...template.options}
            {...chartOptions.options}
            results={results}
          />
        )}
        {error &&
          typeof error === 'string' &&
          dryRun === false &&
          loading === false && (
            <div className="new-chart-info">
              <div className="error-message">{error}</div>
            </div>
          )}
        {dryRun && version === 'editor' && (
          <div className="dry-run-message">{dryRun && 'Dry run'}</div>
        )}
        {(loading || isLoading === index) && !error && (
          <div className="new-chart-info">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" size="1x" />
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading,
    dashboardInfo: {
      id,
      settings: { dryRun, theme: template = {}, charts_theme = {} }
    }
  } = state.app;
  return {
    isLoading,
    dryRun,
    id,
    template,
    charts_theme
  };
};

const mapDispatchToProps = {
  loadSavedQuery,
  changeChartTitle,
  changeChartSubitle,
  savedQueryError,
  setLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
