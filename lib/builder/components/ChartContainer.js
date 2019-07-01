import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeChartTitle,
  loadSavedQuery,
  savedQueryError
} from "../../actions/rootActions";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import client from "../../../config/analysis";
import ChartTypeUtils from "../../func/ChartType";
import _ from "lodash";

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  runSavedQuery = element => {
    client
      .query("saved", element.value)
      .then(results => {
        const newType = ChartTypeUtils.getChartTypeOptions(results.query);
        const type = newType[0];
        this.props.loadSavedQuery(this.props.index);
        this.setState({
          // results: typeof this.state.results === 'object' ? [{...this.state.results}, {...results}] : {...results},
          results,
          savedQuery: {
            value: results.query_name,
            label: results.metadata.display_name
          },
          type: this.props.type ? this.props.type : type,
          loading: false
        });
      })
      .catch(({ body: error }) => {
        this.setState({
          error,
          loading: false
        });
      });
    this.setState({
      loading: true
    });
  };

  componentDidMount() {
    if (
      this.props.savedQuery &&
      (this.props.dryRun === false || this.props.version === "viewer")
    ) {
        // if(Array.isArray(this.props.savedQuery)){
        //   this.props.savedQuery.map(el => {
        //     this.runSavedQuery(el);
        //   })
        // } else {
          this.runSavedQuery(this.props.savedQuery);
        // }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.savedQuery &&
        nextProps.savedQuery.value !== this.props.savedQuery.value) ||
      this.props.savedQuery === false
      // || _.isEqual(this.props.savedQuery, nextProps.savedQuery) === false || _.isEmpty(this.props.savedQuery) !== _.isEmpty(nextProps.savedQuery)
    ) {
      // if(Array.isArray(nextProps.savedQuery)){
      //   nextProps.savedQuery.map(el => {
      //     this.runSavedQuery(el);
      //   })
      // } else {
        this.runSavedQuery(nextProps.savedQuery);
    //   }
    // }
    // if(_.isEmpty(nextProps.savedQuery)){
    //   this.setState({
    //     results: undefined
    //   })
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
      savedQuery,
      version,
      error
    } = this.props;
    const { loading, results, type } = this.state;
    // console.log(savedQuery, results)
    return (
      <React.Fragment>
        <div className="chart-title">
          <input
            type="text"
            value={chartTitle}
            onChange={e => this.props.changeChartTitle(e.target.value, index)}
            placeholder="Enter your title..."
            readOnly={version === "viewer"}
          />
        </div>
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
          results={results}
        />
        {((!results && loading === false && isLoading === false) || error) && (
          <div className="new-chart-info">
            <div className="save-query-message">
              {_.isEmpty(savedQuery) === false
                ? dryRun
                  ? "Dry run enabled"
                  : error
                  ? error
                  : "Dry run disabled, save dashboard and refresh page to rerender charts"
                : "Select saved queries for this chart..."}
            </div>
          </div>
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

const mapStateToProps = state => ({
  isLoading: state.editorReducer.isLoading,
  dryRun: state.editorReducer.dashboardInfo.dryRun
});

const mapDispatchToProps = dispatch => ({
  loadSavedQuery: index => dispatch(loadSavedQuery(index)),
  changeChartTitle: (title, index) => dispatch(changeChartTitle(title, index)),
  savedQueryError: (error, index) => dispatch(savedQueryError(error, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
