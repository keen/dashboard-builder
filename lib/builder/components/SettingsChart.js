import React, { Component } from "react";
import { connect } from "react-redux";
import {
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  changeChartType,
  savedQueryError
} from "../../actions/rootActions";
import SavedQueriesSelect from "./SavedQueriesSelect";
import Select from "react-select";
import ChartTypeUtils from "../../func/ChartType";
import client from "../../../config/analysis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

const legendPosition = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: false, label: "Hidden" }
];

const sparklineOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const stackingOptions = [
  { value: "", label: "None" },
  { value: "normal", label: "Normal" },
  { value: "percent", label: "Percent" }
];

class SettingsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      loading: false,
      type: "",
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
          url: client.url("queries", "saved", props.items.savedQuery[0].value),
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
              const label = item.replace("-", " ");
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
              el => el.value.includes('area') || el.value.includes('line')
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
      type: this.props.items.type
    });
  };

  componentDidMount() {
    if (this.props.items.savedQuery) {
      this.generateSettings(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.items.type !== this.props.items.type ||
      _.isEqual(nextProps.items.savedQuery, this.props.items.savedQuery) ===
        false ||
      nextProps.items.savedQuery.length === 0
    ) {
      this.generateSettings(nextProps);
      this.setState({
        type: this.props.items.type
      });
    }
  }

  render() {
    const {
      settingsVisible,
      items: { savedQuery, sparkline, stacking, legend },
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
        </React.Fragment>
        {results && type && savedQuery.length !== 0 && (
          <React.Fragment>
            <h4>Chart type</h4>
            <Select
              value={chartTypeForSelect}
              onChange={e =>
                this.props.changeChartType(e.value, settingsVisible)
              }
              options={availableChartTypes}
            />
          </React.Fragment>
        )}
        {results &&
          savedQuery.length !== 0 &&
          (results.query.group_by || savedQuery.length > 1) &&
          !sparkline.value &&
          type !== "table" && (
            <React.Fragment>
              <h4>Legend</h4>
              <Select
                value={legend}
                onChange={e =>
                  this.props.selectLegendPosition(e, settingsVisible)
                }
                options={legendPosition}
              />
            </React.Fragment>
          )}
        {savedQuery.length !== 0 && type !== "table" && !type.includes('funnel') && results && (
          <React.Fragment>
            <h4>Sparkline</h4>
            <Select
              value={sparkline}
              onChange={e =>
                this.props.selectSparklineOption(e, settingsVisible)
              }
              options={sparklineOptions}
            />
          </React.Fragment>
        )}
        {results &&
          savedQuery.length !== 0 &&
          results.query.group_by &&
          type !== "table" &&
          type !== "pie" && (
            <React.Fragment>
              <h4>Stacking</h4>
              <Select
                value={stacking}
                onChange={e =>
                  this.props.selectStackingOption(e, settingsVisible)
                }
                options={stackingOptions}
              />
            </React.Fragment>
          )}
        {(loading || isLoading === settingsVisible) && (
          <div className="settings-loading">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" />
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

const mapDispatchToProps = dispatch => ({
  selectLegendPosition: (value, index) =>
    dispatch(selectLegendPosition(value, index)),
  selectSparklineOption: (value, index) =>
    dispatch(selectSparklineOption(value, index)),
  selectStackingOption: (value, index) =>
    dispatch(selectStackingOption(value, index)),
  changeChartType: (value, index) => dispatch(changeChartType(value, index)),
  savedQueryError: (error, index) => dispatch(savedQueryError(error, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChart);
