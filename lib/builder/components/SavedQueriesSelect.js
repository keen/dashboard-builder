import React, { Component } from "react";
import ChartTypeUtils from "../func/ChartType";
import Select from "react-select";

export default class SavedQueriesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedQueriesForChart: []
    };
  }

  componentDidMount() {
    this.setState({
      savedQueriesForChart: this.props.savedQueries
        .filter(el => {
          if (
            ChartTypeUtils.getChartTypeOptions(el.query).includes(
              this.props.type
            )
          ) {
            return el;
          }
        })
        .map(el => ({
          value: el.query_name,
          label: el.metadata.display_name
        }))
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({
        savedQueriesForChart: this.props.savedQueries
          .filter(el => {
            if (
              ChartTypeUtils.getChartTypeOptions(el.query).includes(
                nextProps.type
              )
            ) {
              return el;
            }
          })
          .map(el => ({
            value: el.query_name,
            label: el.metadata.display_name
          }))
      });
    }
  }

  render() {
    const { savedQueriesForChart } = this.state;
    const { selectSavedQuery, index, value } = this.props;
    return (
      <div className="settings-select">
        {savedQueriesForChart.length > 0 ? (
          <Select
            value={value || ""}
            onChange={e => selectSavedQuery(e, index)}
            options={savedQueriesForChart}
          />
        ) : (
          <div className="save-query-message">
            No saved queries found for this chart type...
          </div>
        )}
      </div>
    );
  }
}
