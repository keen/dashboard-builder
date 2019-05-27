import React, { Component } from "react";
import client from "../config/analysis";
import ChartTypeUtils from "../func/ChartType";
import Select from "react-select";

const queryData = [
  {
    metadata: {
      display_name: "Actions and purchases"
    },
    query: {
      analysis_type: "count",
      event_collection: "mobile_purchases",
      group_by: null,
      interval: "daily"
    },
    query_name: "actions-and-purchases"
  },
  {
    metadata: {
      display_name: "Books purchases"
    },
    query: {
      analysis_type: "count",
      event_collection: "mobile_purchases",
      group_by: null,
      interval: "daily"
    },
    query_name: "books-purchases"
  },
  {
    metadata: {
      display_name: "Games purchases"
    },
    query: {
      analysis_type: "count",
      event_collection: "mobile_purchases",
      group_by: null,
      interval: "daily"
    },
    query_name: "games-purchases"
  },
  {
    metadata: {
      display_name: "Mobile sales"
    },
    query: {
      analysis_type: "count",
      event_collection: "mobile_purchases",
      group_by: ["product.name"],
      interval: "daily"
    },
    query_name: "mobile-sales"
  }
];

export default class SavedQueriesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedQueries: []
    }
  }

  componentDidMount() {
    // Load saved queries from api
    // client
    //   .get(client.url("queries", "saved"))
    //   .auth(client.masterKey())
    //   .send()
    //   .then(res => {
    //     const filteredQueries = res.filter(el => {
    //       if (
    //         ChartTypeUtils.getChartTypeOptions(el.query).includes(
    //           this.props.type
    //         )
    //       ) {
    //         return el;
    //       }
    //     });

    //     this.setState({
    //       savedQueries: filteredQueries.map(el => ({
    //         value: el.query_name,
    //         label: el.metadata.display_name
    //       }))
    //     });
    //   })
    //   .catch(err => {
    //     // Handle error
    //   });

    // Mocked data:
    // const filteredQueries = queryData.filter(el => {
    //   if (
    //     ChartTypeUtils.getChartTypeOptions(el.query).includes(this.props.type)
    //   ) {
    //     return el;
    //   }
    // });

    this.setState({
      savedQueries: queryData.filter(el => {
        if (
          ChartTypeUtils.getChartTypeOptions(el.query).includes(this.props.type)
        ) {
          return el;
        }
      }).map(el => ({
        value: el.query_name,
        label: el.metadata.display_name
      }))
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.type !== nextProps.type){
      this.setState({
        savedQueries: queryData.filter(el => {
          if (
            ChartTypeUtils.getChartTypeOptions(el.query).includes(nextProps.type)
          ) {
            return el;
          }
        }).map(el => ({
          value: el.query_name,
          label: el.metadata.display_name
        }))
      });
    }
  }

  render() {
    const { savedQueries } = this.state;
    const { selectSavedQuery, index, value } = this.props;
    return (
      <div className="settings-select">
        {savedQueries.length > 0 ? (
          <Select
            value={value}
            onChange={e => selectSavedQuery(e, index)}
            options={savedQueries}
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
