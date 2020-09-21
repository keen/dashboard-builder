import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  toggleDashboardsMenu,
  setAccessKey,
  clearAccessKey
} from '../../actions/rootActions';
import getKeyFromAPI from '../../func/getKeyFromAPI';
import copyToClipboard from '../../func/copyToClipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import KeenAnalysisContext from '../../contexts/keenAnalysis';

const ShareDashboards = props => {
  const keenAnalysis = useContext(KeenAnalysisContext);
  useEffect(() => {
    if (!props.accessKey) {
      getKeyFromAPI(props.savedQueriesList, props.id, keenAnalysis).then(data =>
        props.setAccessKey(data)
      );
    }
  }, []);

  // TODO: Remove hardcoded URL
  const getShareUrl = () => {
    return `https://dashboards.keen.io/?id=${props.id}&projectId=${props.project_id}&accessKey=${props.accessKey}`;
  };

  return (
    <div className="share-dashboard modal">
      <div className="modal-header">
        Share Your Dashboard
        <FontAwesomeIcon
          icon="times"
          size="sm"
          onClick={() => props.toggleDashboardsMenu()}
        />
      </div>
      <div className="modal-body">
        <p>Here's the link for the read-only access to your dashboard.</p>
        <p>
          Your dashboard will be accessible to all of the people who you share
          this link with.
        </p>
        <input
          className="modal-input"
          type="text"
          readOnly
          value={getShareUrl()}
        />
        <button
          className="modal-button"
          type="button"
          onClick={() => copyToClipboard(getShareUrl())}
        >
          <FontAwesomeIcon icon="copy" size="sm" />
          COPY
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      title,
      data,
      project_id,
      settings: { savedQueriesList }
    },
    accessKey
  } = state.app;
  return {
    id,
    title,
    data,
    project_id,
    accessKey,
    savedQueriesList
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
