import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading, selectSavedQuery } from '../../actions/rootActions';
import ChartTypeUtils from '../../func/ChartType';
import Select from 'react-select';

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

  selectSavedQuery = (query, id) => {
    const { items } = this.props;
    const item = items.find(item => item.i === id);
    const index = item.i;
    const loader = query.length ? index : false;

    this.props.setLoading(loader);
    this.props.selectSavedQuery(query, index);
  };

  render() {
    const { savedQueriesForChart } = this.state;
    const { index, value, type } = this.props;
    return (
      <div className="settings-select">
        {savedQueriesForChart.length > 0 ? (
          <Select
            value={value || ''}
            onChange={val => this.selectSavedQuery(val, index)}
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
  const { savedQueries, settingsVisible, dashboardInfo: { settings: { items }} } = state;
  return {
    savedQueries,
    settingsVisible,
    items,
  };
};

const mapDispatchTopProsp = {
  setLoading,
  selectSavedQuery
};

export default connect(
  mapStateToProps,
  mapDispatchTopProsp
)(SavedQueriesSelect);
