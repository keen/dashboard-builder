import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toogleDashboardsMenu,
  setAccessKey,
  clearAccessKey,
} from "../../actions/rootActions";
import client from "../../../config/analysis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareDashboards = props => {
  useEffect(() => {
    const getKeyFromAPI = async () => {
      const keyName = props.dashboardTitle;
      let key = await
        client
          .get({
            url: client.url('projectId', `keys?name=${keyName}`),
            api_key: client.masterKey(),
          });
        
        if (!key.length) {
          key = await
            client
              .post({
                url: client.url('projectId', 'keys'),
                api_key: client.masterKey(),
                params: {
                  name: keyName,
                  is_active: true,
                  permitted: [ 'queries', 'saved_queries' ],
                }
              })
          return key.key;
        }
        return key[0].key;
    }

    getKeyFromAPI().then(data => props.setAccessKey(data));

  }, []);

  const shareURL = `https://dashboards.keen.io/?dashboardId=${props.id}&accessKey=${props.accessKey}`;

  const copyUrl = (event) => {
    event.preventDefault();

    const placeholder = document.createElement('textarea');
    placeholder.value = shareURL;
    placeholder.classList = 'copy-to-clipboard';
    
    document.body.appendChild(placeholder);
    placeholder.select();
    document.execCommand('copy');
    
    document.body.removeChild(placeholder);
  }

  return (
    <div className="share-dashboard modal">
      <div className="modal-header">
        Share Dashboard
        <FontAwesomeIcon icon="times" onClick={props.toogleDashboardsMenu} />
      </div>
      <div className="modal-body">
        <div>
          <p>You can use URL below to share your dashboard</p>
          <input className="modal-input" type="text" readOnly value={shareURL} />
          <button className="modal-button" type="button" onClick={copyUrl}>Copy URL</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardTitle },
    dashboardsMenu,
    accessKey,
  } = state;
  return {
    id,
    dashboardTitle,
    dashboardsMenu,
    accessKey
  };
};

const mapDispatchToProps = dispatch => ({
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  setAccessKey: value => dispatch(setAccessKey(value)),
  clearAccessKey: () => dispatch(clearAccessKey()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShareDashboards)
);
