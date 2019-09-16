import React, { Component } from "react";
import { connect } from "react-redux";
import {
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  changeChartType,
  savedQueryError,
  setPrefix,
  setSuffix,
  selectShowPoints,
  selectPointsSize,
  selectChoroplethMap,
  showChoroplethBorder,
  selectChoroplethBorderSize,
  showChoroplethSliders,
  showHeatmapSliders,
  showHeatmapTooltipValue,
} from "../../actions/rootActions";
import SavedQueriesSelect from "./SavedQueriesSelect";
import Select from "react-select";
import ChartTypeUtils from "../../func/ChartType";
import { client } from "Client/index";
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

const showPointsOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const pointsSizeOptions = [];
for (let i = 1; i < 11; i++) {
  pointsSizeOptions.push({ value: i, label: `${i}px` });
}

const mapChoroplethOptions = [
  { value: "world", label: "World" },
  { value: "us", label: "United States" }
];

const choroplethBorderSizeOptions = [];
for (let i = 1; i < 11; i++) {
  choroplethBorderSizeOptions.push({ value: Number(`0.${i}`), label: `0.${i}px` });
}

const showChoroplethBordersOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const showChoroplethSlidersOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const showHeatmapSlidersOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const showHeatmapTooltipValueOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
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
              el => el.value.includes("area") || el.value.includes("line")
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

  componentWillReceiveProps(nextProps) {
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
        showHeatmapTooltipValue,
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

    const showPointsValue = showPoints
      ? showPoints
      : { value: true, label: "Yes" };
    console.log('settings chart ', this.props);
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
          type !== "table" &&
          type !== "choropleth" && 
          type !== "heatmap" && (
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
        {savedQuery.length !== 0 &&
          type !== "table" &&
          type !== "metric" &&
          (type && !type.includes("funnel")) &&
          results &&
          type !== "choropleth" &&
          type !== "heatmap" && (
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
          type !== "pie" &&
          type !== "choropleth" &&
          type !== "heatmap" && (
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
        {type === "metric" && (
          <React.Fragment>
            <h4>Prefix value</h4>
            <input
              onChange={e => this.props.setPrefix(e, settingsVisible)}
              className="settings-input"
              defaultValue={prefix}
            />
            <h4>Suffix value</h4>
            <input
              onChange={e => this.props.setSuffix(e, settingsVisible)}
              className="settings-input"
              defaultValue={suffix}
            />
          </React.Fragment>
        )}
        {(type.includes("line") ||
          (type.includes("area") && !type.includes("step"))) && (
          <React.Fragment>
            <h4>Show points</h4>
            <Select
              defaultValue={showPointsValue}
              value={showPoints}
              onChange={e => this.props.selectShowPoints(e, settingsVisible)}
              options={showPointsOptions}
            />
            {showPointsValue.value && (
              <React.Fragment>
                <h4>Points size</h4>
                <Select
                  defaultValue={{ value: 2, label: "2px" }}
                  value={pointsSize}
                  onChange={e =>
                    this.props.selectPointsSize(e, settingsVisible)
                  }
                  options={pointsSizeOptions}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {type === "choropleth" && (
          <React.Fragment>
            <h4>Map</h4>
            <Select
              defaultValue={{ value: "world", label: "World" }}
              value={mapChoropleth}
              onChange={e => this.props.selectChoroplethMap(e, settingsVisible)}
              options={mapChoroplethOptions}
            />
            <h4>Show borders</h4>
            <Select
              defaultValue={{ value: true, label: "Yes" }}
              value={borderChoropleth}
              onChange={e =>
                this.props.showChoroplethBorder(e, settingsVisible)
              }
              options={showChoroplethBordersOptions}
            />
            {borderChoropleth.value && (
              <React.Fragment>
                <h4>Border size</h4>
                <Select
                  defaultValue={{ value: 0.5, label: "0.5px" }}
                  value={borderSizeChoropleth}
                  onChange={e =>
                    this.props.selectChoroplethBorderSize(e, settingsVisible)
                  }
                  options={choroplethBorderSizeOptions}
                />
              </React.Fragment>
            )}
            <h4>Show sliders</h4>
            <Select
              defaultValue={{ value: false, label: "No" }}
              value={slidersChoropleth}
              onChange={e =>
                this.props.showChoroplethSliders(e, settingsVisible)
              }
              options={showChoroplethSlidersOptions}
            />
          </React.Fragment>
        )}
        {type === "heatmap" && (
          <React.Fragment>
            <h4>Heatmap</h4>
            <h4>Show sliders</h4>
            <Select
              defaultValue={{ value: false, label: "No" }}
              value={slidersHeatmap}
              onChange={e =>
                this.props.showHeatmapSliders(e, settingsVisible)
              }
              options={showHeatmapSlidersOptions}
            />
          </React.Fragment>
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
  selectLegendPosition,
  selectSparklineOption,
  selectStackingOption,
  changeChartType,
  savedQueryError,
  setPrefix,
  setSuffix,
  selectShowPoints,
  selectPointsSize,
  selectChoroplethMap,
  showChoroplethBorder,
  selectChoroplethBorderSize,
  showChoroplethSliders,
  showHeatmapSliders,
  showHeatmapTooltipValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChart);
