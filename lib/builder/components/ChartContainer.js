import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeChartTitle,
  loadSavedQuery,
  savedQueryError,
  setLoading
} from "../../actions/rootActions";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "Client/index";
import ChartTypeUtils from "../../func/ChartType";
import _ from "lodash";

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
    client
      .query("saved", element.value)
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
              : type.includes("area") || type.includes("line")
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
      promises.push(client.query("saved", el.value));
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
      (this.props.dryRun === false || this.props.version === "viewer")
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

  componentWillReceiveProps(nextProps) {
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
      if (nextProps.version === "viewer" || nextProps.dryRun === false) {
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
      show: showPoints ? showPoints.value ? true : false : true ,
      r: pointsSize ? pointsSize.value : 2.5
    }

    return (
      <React.Fragment>
        {(version === "editor" || (version === "viewer" && chartTitle)) && (
          <div className="chart-title">
            <input
              type="text"
              value={chartTitle || ""}
              onChange={e => this.props.changeChartTitle(e.target.value, index)}
              placeholder="Enter your title..."
              readOnly={version === "viewer"}
            />
          </div>
        )}
        <Chart
          type={type}
          {...this.props}
          legend={
            legend.value === false
              ? { show: false }
              : { position: legend.value }
          }
          sparkline={sparkline.value && sparkline.value}
          stacking={stacking.value && stacking.value}
          point={pointSettings}
          results={results}
        />
        {error && dryRun === false && loading === false && (
          <div className="new-chart-info">
            <div className="error-message">{error}</div>
          </div>
        )}
        {dryRun && version === "editor" && (
          <div className="dry-run-message">{dryRun && "Dry run"}</div>
        )}
        {(loading || isLoading === index) && !error && (
          <div className="new-chart-info">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" />
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
      settings: { dryRun }
    }
  } = state;
  return {
    isLoading,
    dryRun,
    id
  };
};

const mapDispatchToProps = {
  loadSavedQuery,
  changeChartTitle,
  savedQueryError,
  setLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
