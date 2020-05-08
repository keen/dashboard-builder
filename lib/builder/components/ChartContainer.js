/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadSavedQuery,
  savedQueryError,
  setLoading
} from '../../actions/rootActions';
import Chart from './Chart';
import CustomChartTheme from './CustomChartTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartTypeUtils from '../../func/ChartType';
import isEqual from 'lodash/isEqual';

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
      .catch(err => {
        this.setState({
          error: err.body,
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
      .catch(err => {
        this.setState({
          error: err.body,
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
    isEqual(nextProps.savedQuery, this.props.savedQuery) === false ||
      (this.props.id !== nextProps.id && this.setState({ results: undefined }));
    if (
      this.props.id !== nextProps.id ||
      (this.props.savedQuery &&
        nextProps.dryRun === false &&
        isEqual(nextProps.savedQuery, this.props.savedQuery) === false) ||
      (this.props.savedQuery === false &&
        nextProps.savedQuery &&
        this.props.type !== nextProps.type) ||
      (this.props.dryRun !== nextProps.dryRun &&
        nextProps.dryRun === false &&
        this.props.id === nextProps.id)
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
      index,
      isLoading,
      dryRun,
      version,
      error,
      template,
      id,
      charts_theme
    } = this.props;
    const { loading, results, type, error: stateError } = this.state;
    const chartOptions =
      charts_theme &&
      charts_theme[index] !== undefined &&
      charts_theme[index] !== null
        ? charts_theme[index]
        : {};

    const errorMessage = error || stateError;

    return (
      <React.Fragment>
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
        {errorMessage &&
          typeof errorMessage === 'string' &&
          dryRun === false &&
          loading === false && (
            <div className="new-chart-info">
              <div className="error-message">{errorMessage}</div>
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
  savedQueryError,
  setLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
