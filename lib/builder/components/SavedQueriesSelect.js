import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading, selectSavedQuery, addSavedQueryToList, deleteSavedQueryFromList } from '../../actions/rootActions';
import ChartTypeUtils from '../../func/ChartType';
import Select from 'react-select';
import _ from 'lodash';

class SavedQueriesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedQueriesForChart: [],
      oldValue: ''
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
        })),
        oldValue: this.props.value
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {console.log(this.props.value)
    if (
      this.props.type !== nextProps.type ||
      this.props.settingsVisible !== nextProps.settingsVisible
    ) {
      this.setState({
        savedQueriesForChart: nextProps.savedQueries
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
    this.setState({
      oldValue: this.props.value
    })
  }

  selectSavedQuery = (e, index) => {
    const { oldValue } = this.state;
    oldValue.length > 0 ?
      oldValue.forEach(el => {
        this.props.deleteSavedQueryFromList(el.value)
      })
    :
    this.props.deleteSavedQueryFromList(oldValue.value);
    e.length > 0 ?
      e.forEach(el => {
        el.value && this.props.addSavedQueryToList(el.value)
      })
    :
    e.value && this.props.addSavedQueryToList(e.value);
    if (e.length > 0) {
      this.props.setLoading(index);
      this.props.selectSavedQuery(e, index);
      return;
    }
    this.props.setLoading(false);
    this.props.selectSavedQuery(e, index);
  };

  render() {
    const { savedQueriesForChart } = this.state;
    const { index, value, type } = this.props;
    return (
      <div className="settings-select">
        {savedQueriesForChart.length > 0 ? (
          <Select
            value={value || ''}
            onChange={e => this.selectSavedQuery(e, index)}
            options={savedQueriesForChart}
            isMulti={type && (type.includes('area') || type.includes('line'))}
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

const mapStateToProps = state => {
  const { savedQueries, settingsVisible } = state;
  return {
    savedQueries,
    settingsVisible
  };
};

const mapDispatchTopProsp = {
  setLoading,
  selectSavedQuery,
  addSavedQueryToList,
  deleteSavedQueryFromList
};

export default connect(
  mapStateToProps,
  mapDispatchTopProsp
)(SavedQueriesSelect);
