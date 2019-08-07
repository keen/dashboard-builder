import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadDashboardInfo,
  clearDashboardInfo
} from "../../actions/rootActions";
import EditorContainer from "./EditorContainer";

class Editor extends Component {
  constructor(props) {
    super(props);
    console.log('%c editor ', 'background: #222; color: #bada55', props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadDashboardInfo(id);
  }

  componentWillUnmount() {
    this.props.clearDashboardInfo();
  }

  render() {
    const { editable, switcherEnabled } = this.props;
    return (
      <div className="dashboard-builder">
        <EditorContainer version="viewer" editable={editable} switcherEnabled={switcherEnabled} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearDashboardInfo: () => dispatch(clearDashboardInfo())
});

export default connect(
  null,
  mapDispatchToProps
)(Editor);

Editor.propTypes = {
  "dashboardInfo": PropTypes.shape({
    "created_date": PropTypes.string,
    "data": PropTypes.shape({
      "version": PropTypes.number,
      "items": PropTypes.arrayOf(PropTypes.shape({
        "chartTitle": PropTypes.string,
        "height": PropTypes.number,
        "width": PropTypes.number,
        "top": PropTypes.number,
        "left": PropTypes.number,
        "colors": PropTypes.array,
        "palette": PropTypes.string,
        "picker": PropTypes.object,
        "legend": PropTypes.shape({
          "value": PropTypes.string,
          "label": PropTypes.string,
        }),
        "sparkline": PropTypes.shape({
          "value": PropTypes.bool,
          "label": PropTypes.string
        }),
        "stacking": PropTypes.shape({
          "value": PropTypes.string,
          "label": PropTypes.string,
        }),
        "savedQuery": PropTypes.shape({
          "value": PropTypes.string,
          "label": PropTypes.string,
        }),
      })),
    }),
    "id": PropTypes.string,
    "is_public": PropTypes.bool,
    "last_modified_date": PropTypes.string,
    "project_id": PropTypes.string,
    "rows": PropTypes.arrayOf(PropTypes.shape({
      "height": PropTypes.number,
      "tiles": PropTypes.arrayOf(PropTypes.shape({
        "column_width": PropTypes.number,
        "query_name": PropTypes.string,
      }))
    })),
    "settings": PropTypes.shape({
      "dryRun": PropTypes.bool,
      "is_public": PropTypes.bool,
      "colors": PropTypes.array,
      "palette": PropTypes.string,
      "picker": PropTypes.object,
    }),
    "title": PropTypes.string,
  })
}
