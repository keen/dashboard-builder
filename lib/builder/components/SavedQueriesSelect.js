import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading, selectSavedQuery, changeSavedQueryList } from '../../actions/rootActions';
import ChartTypeUtils from '../../func/ChartType';
import Select from 'react-select';
import _ from 'lodash';

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
        })),
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
  }

  selectSavedQuery = (e, index) => {console.log(this.props.value)
    const { value: oldValue } = this.props;
    this.props.changeSavedQueryList(oldValue, e);
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
  changeSavedQueryList
};

export default connect(
  mapStateToProps,
  mapDispatchTopProsp
)(SavedQueriesSelect);
