import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toogleDashboardsMenu,
  // loadDashboardInfo
} from "../../actions/rootActions";
import client from "../../../config/analysis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareDashboards = props => {
  const [ accessKey, setAccessKey ] = useState('');
  useEffect(() => {
    const keyName = props.dashboardTitle;
    console.log(keyName);
    client
    .get({
      url: client.url('projectId', 'keys'),
      api_key: client.masterKey(),
    })
    .then(res => {
      console.log('access key =>', res);
      // Handle response
    })
    .catch(err => {
      console.log(err);
      // Handle error
    });
  });

  // client
  // .post({
  //   url: client.url('projectId', 'keys'),
  //   api_key: client.masterKey(),
  //   params: {
  //     name: props.dashboardTitle,
  //     is_active: true,
  //     permitted: [ 'queries', 'saved_queries' ],
  //   }
  // })
  // .then(res => {
  //   console.log('access key =>', res);
  //   // Handle response
  // })
  // .catch(err => {
  //   console.log(err);
  //   // Handle error
  // });

  return (
    <div className="share-dashboard modal">
      <div className="modal-header">
        Share Dashboard
        <FontAwesomeIcon icon="times" onClick={props.toogleDashboardsMenu} />
      </div>
      <div className="modal-body">
        <p>dashboard id: {props.id}</p>
        <p>dashboard title: {props.dashboardTitle}</p>
        <p>You can use URL below to share your dashboard</p>
        <input type="text" readOnly value="https://dashboards.keen.io/?dashboardId=12345&accessKey=100200300" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardTitle },
    dashboardsMenu,
  } = state;
  return {
    id,
    dashboardTitle,
    dashboardsMenu,
  };
};

const mapDispatchToProps = dispatch => ({
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  // loadDashboardInfo: id => dispatch(loadDashboardInfo(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShareDashboards)
);
