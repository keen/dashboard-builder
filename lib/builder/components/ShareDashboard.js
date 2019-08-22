import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleDashboardsMenu,
  setAccessKey,
  clearAccessKey
} from "../../actions/rootActions";
import getKeyFromAPI from '../../func/getKeyFromAPI';
import copyToClipboard from '../../func/copyToClipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareDashboards = props => {
  useEffect(() => {
    if (!props.accessKey) {
      getKeyFromAPI(props.data, props.title).then(data => props.setAccessKey(data));
    }
  }, []);

  const getShareUrl = () => {
    return `https://dashboards.keen.io?id=${props.id}&projectId=${
      props.project_id
    }&accessKey=${props.accessKey}`;
  };

  return (
    <div className="share-dashboard modal">
      <div className="modal-header">
        Share Your Dashboard
        <FontAwesomeIcon icon="times" onClick={() => props.toggleDashboardsMenu()}/>
      </div>
      <div className="modal-body">
        <p>Here's a link for the read-only access to your dashboard</p>
        <input
          className="modal-input"
          type="text"
          readOnly
          value={getShareUrl()}
        />
        <button className="modal-button" type="button" onClick={() => copyToClipboard(getShareUrl())}>
          <FontAwesomeIcon icon="copy" />
          COPY
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, title, data, project_id },
    accessKey
  } = state;
  return {
    id,
    title,
    data,
    project_id,
    accessKey
  };
};

const mapDispatchToProps = {
  toggleDashboardsMenu,
  setAccessKey,
  clearAccessKey
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShareDashboards)
);
