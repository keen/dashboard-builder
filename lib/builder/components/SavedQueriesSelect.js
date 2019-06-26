import React, { Component } from "react";
import { connect } from 'react-redux';
import { setLoading, selectSavedQuery } from '../../actions/rootActions';
import ChartTypeUtils from "../../func/ChartType";
import Select from "react-select";

class SavedQueriesSelect extends Component {
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

  selectSavedQuery = (e, index) => {
    this.props.setLoading(index);
    this.props.selectSavedQuery(e, index)
  }

  render() {
    const { savedQueriesForChart } = this.state;
    const { index, value } = this.props;
    return (
      <div className="settings-select">
        {savedQueriesForChart.length > 0 ? (
          <Select
            value={value || ""}
            onChange={e => this.selectSavedQuery(e, index)}
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

const mapStateToProps = state => ({
  savedQueries: state.editorReducer.savedQueries,
})

const mapDispatchTopProsp = dispatch => ({
  setLoading: index => dispatch(setLoading(index)),
  selectSavedQuery: (value, index) => dispatch(selectSavedQuery(value, index)) 
})

export default connect(mapStateToProps, mapDispatchTopProsp)(SavedQueriesSelect);
