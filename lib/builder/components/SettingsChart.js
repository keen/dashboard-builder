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
    {
      client
        .query("saved", props.dashboardData.savedQuery.value)
        .then(results => {
          const newType = ChartTypeUtils.getChartTypeOptions(results.query);
          const type = newType[0];
          this.setState({
            results,
            type: props.dashboardData.type ? props.dashboardData.type : type,
            loading: false
          });
          if (this.state.type) {
            const { type, results } = this.state;
            const typeForSelect = item => {
              const label = item.replace("-", " ");
              return label.charAt(0).toUpperCase() + label.slice(1);
            };

            const availableChartTypes =
              results &&
              ChartTypeUtils.getChartTypeOptions(results.query).map(value => {
                return {
                  value,
                  label: typeForSelect(value)
                };
              });

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
        .catch(({body: err}) => {
          props.savedQueryError(err, props.settingsVisible);
          this.setState({
            type: this.props.dashboardData.type,
            loading: false
          })
        });
      this.setState({
        loading: true
      });
    }
  };

  componentDidMount() {
    if (this.props.dashboardData.savedQuery) {
      this.generateSettings(this.props);
    } else {
      this.setState({
        type: this.props.dashboardData.type
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.dashboardData.type !== this.props.dashboardData.type ||
      nextProps.dashboardData.savedQuery !== this.props.dashboardData.savedQuery 
    ) {
      this.generateSettings(nextProps);
    }
  }

  render() {
    const {
      settingsVisible,
      dashboardData: { savedQuery, sparkline, stacking, legend }
    } = this.props;

    const {
      results,
      loading,
      type,
      chartTypeForSelect,
      availableChartTypes
    } = this.state;

    return (
      <React.Fragment>
        <React.Fragment>
          <h4>Saved Query:</h4>
          <SavedQueriesSelect
            value={savedQuery}
            index={settingsVisible}
            type={type}
          />
        </React.Fragment>
        {results && type && (
          <React.Fragment>
            <h4>Chart type:</h4>
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
          savedQuery &&
          results.query.group_by &&
          !sparkline.value &&
          type !== "table" && (
            <React.Fragment>
              <h4>Legend:</h4>
              <Select
                value={legend}
                onChange={e =>
                  this.props.selectLegendPosition(e, settingsVisible)
                }
                options={legendPosition}
              />
            </React.Fragment>
          )}
        {savedQuery && type !== "table" && (
          <React.Fragment>
            <h4>Sparkline:</h4>
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
          savedQuery &&
          results.query.group_by &&
          type !== "table" &&
          type !== "pie" && (
            <React.Fragment>
              <h4>Stacking:</h4>
              <Select
                value={stacking}
                onChange={e =>
                  this.props.selectStackingOption(e, settingsVisible)
                }
                options={stackingOptions}
              />
            </React.Fragment>
          )}
        {loading && (
          <div className="settings-loading">
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
    settingsVisible,
    dashboardInfo: { dashboardData }
  } = state.editorReducer;
  return {
    settingsVisible,
    dashboardData: dashboardData[settingsVisible]
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
