import React, { Component } from "react";
import client from "../config/analysis";
import ChartTypeUtils from "../func/ChartType";

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
    };
  }

  componentDidMount() {
    // client
    // .get(client.url("queries", "saved"))
    // .auth(client.masterKey())
    // .send()
    // .then(res => {
    //   console.log(res)
    //   this.setState({
    //     savedQueries: res.filter((el) => {
    //         if(ChartTypeUtils.getChartTypeOptions(el.query).includes(this.props.type)){
    //           return el;
    //         }
    //     })
    //   })
    // })
    // .catch(err => {
    //   // Handle error
    // });
    this.setState({
      savedQueries: queryData.filter(el => {
        if (
          ChartTypeUtils.getChartTypeOptions(el.query).includes(this.props.type)
        ) {
          return el;
        }
      })
    });
  }

  render() {
    const { savedQueries } = this.state;
    const { selectSavedQuery, index } = this.props;
    return (
      <div className="saved-select">
        {savedQueries.length > 0 ? (
          <select onChange={e => selectSavedQuery(e, index)}>
            <option value="">Select saved query</option>
            {savedQueries.map((el, i) => {
              return (
                <option key={i} value={el.query_name}>
                  {el.metadata.display_name}
                </option>
              );
            })}
          </select>
        ) : (
          <div className="save-query-message">
            No saved queries found for this chart type...
          </div>
        )}
      </div>
    );
  }
}
