import React, { Component } from "react";
import PropTypes from "prop-types";
import KeenDataviz from "keen-dataviz";
import _ from "lodash";

export default class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.keenDataviz.destroy();
    this.createKeenDataviz();
  }

  componentWillUnmount() {
    this.keenDataviz.destroy();
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height ||
      this.props.palette !== nextProps.palette ||
      this.props.type !== nextProps.type ||
      this.props.legend.position !== nextProps.legend.position ||
      this.props.sparkline !== nextProps.sparkline ||
      this.props.stacking !== nextProps.stacking ||
      this.props.savedQuery !== nextProps.savedQuery ||
      !_.isEqual(this.props.results.result, nextProps.results.result)
    ) {
      return true;
    }
    return false;
  }

  createKeenDataviz() {
    this.keenDataviz = new KeenDataviz({
      container: this.el,
      react: true,
      ...this.props
    });
  }

  handleRef = el => {
    if (el) {
      this.el = el;
      this.createKeenDataviz();
    }
  };

  render() {
    return <div className={this.props.theme} ref={this.handleRef} />;
  }
}

Chart.propTypes = {
  type: PropTypes.string,
  showDeprecationWarnings: PropTypes.bool,
  showLoadingSpinner: PropTypes.bool,
  theme: PropTypes.string,
  dateFormat: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  legend: PropTypes.shape({
    show: PropTypes.bool,
    position: PropTypes.string,
    label: PropTypes.shape({
      textMaxLength: PropTypes.number
    }),
    pagination: PropTypes.shape({
      offset: PropTypes.number,
      limit: PropTypes.number
    }),
    tooltip: PropTypes.shape({
      show: PropTypes.bool,
      pointer: PropTypes.bool
    }),
    sort: PropTypes.string
  }),
  colors: PropTypes.arrayOf(PropTypes.string),
  colorMapping: PropTypes.objectOf(PropTypes.string),
  labelMapping: PropTypes.objectOf(PropTypes.string),
  labelMappingRegExp: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  labelMappingDimension: PropTypes.string,
  errorMapping: PropTypes.objectOf(PropTypes.string),
  showErrorMessages: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  sortGroups: PropTypes.string,
  sortIntervals: PropTypes.string,
  stacking: PropTypes.string,
  table: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.string),
    pagination: PropTypes.shape({
      limit: PropTypes.number
    }),
    mapValues: PropTypes.func
  }),
  renderOnVisible: PropTypes.bool,
  results: PropTypes.any,
  previousResults: PropTypes.shape({
    result: PropTypes.number
  }),
  funnel: PropTypes.shape({
    lines: PropTypes.bool,
    resultValues: PropTypes.bool,
    percents: PropTypes.shape({
      show: PropTypes.bool,
      countingMethod: PropTypes.string,
      decimals: PropTypes.number
    }),
    hover: PropTypes.bool,
    marginBetweenSteps: PropTypes.bool,
    effect3d: PropTypes.string
  }),
  stacked: PropTypes.bool,
  indexBy: PropTypes.string,
  library: PropTypes.string,
  timezone: PropTypes.string,
  padding: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  tooltip: PropTypes.shape({
    show: PropTypes.bool,
    grouped: PropTypes.bool,
    format: PropTypes.shape({
      title: PropTypes.func,
      name: PropTypes.func,
      value: PropTypes.func
    }),
    position: PropTypes.func,
    contenss: PropTypes.func
  }),
  partialIntervalIndicator: PropTypes.shape({
    show: PropTypes.bool,
    className: PropTypes.string
  }),
  showTitle: PropTypes.bool,
  notes: PropTypes.string,
  axis: PropTypes.any,
  color: PropTypes.any,
  point: PropTypes.any,
  transition: PropTypes.any,
  data: PropTypes.any,
  grid: PropTypes.any
};

Chart.defaultProps = {
  theme: "keen-dataviz",
  results: { result: [200, 300, 100, 400, 250] },
  title: false,
  type: 'bar'
};
