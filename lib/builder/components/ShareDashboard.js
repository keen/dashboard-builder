import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleDashboardsMenu,
  setAccessKey,
  clearAccessKey,
} from "../../actions/rootActions";
import { client } from "Client/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareDashboards = props => {
  useEffect(() => {
    let savedQueries = [];
    props.data.items.forEach(data => {
      data.savedQuery &&
        data.savedQuery.forEach(item => {
          item.value && savedQueries.push(item.value);
        });
    });
    const savedQueriesSet = new Set(savedQueries);
    const uniqueSavedQueries = Array.from(savedQueriesSet);
    const getKeyFromAPI = async () => {
      const keyName = `public-dashboard: ${props.title}`;
      let key = await client.get({
        url: client.url("projectId", `keys?name=${keyName}`),
        api_key: client.masterKey()
      });

      if (!key.length) {
        key = await client.post({
          url: client.url("projectId", "keys"),
          api_key: client.masterKey(),
          params: {
            name: keyName,
            is_active: true,
            permitted: ["saved_queries", "cached_queries"],
            options: {
              saved_queries: {
                allowed: uniqueSavedQueries
              },
              cached_queries: {
                allowed: uniqueSavedQueries
              }
            }
          }
        });
        return key.key;
      }
      return key[0].key;
    };

    if (!props.accessKey) {
      getKeyFromAPI().then(data => props.setAccessKey(data));
    }
  }, []);

  const getShareUrl = () => {
    return `https://dashboards.keen.io?id=${props.id}&projectId=${props.project_id}&accessKey=${props.accessKey}`;
  };

  const copyUrl = event => {
    event.preventDefault();

    const placeholder = document.createElement("textarea");
    placeholder.value = getShareUrl();
    placeholder.classList = "copy-to-clipboard";

    document.body.appendChild(placeholder);
    placeholder.select();
    document.execCommand("copy");

    document.body.removeChild(placeholder);
  };

  return (
    <div className="share-dashboard modal">
      <div className="modal-header">
        Share Your Dashboard
        <FontAwesomeIcon icon="times" onClick={props.toggleDashboardsMenu} />
      </div>
      <div className="modal-body">
        <p>Here's a link for the read-only access to your dashboard</p>
        <input
          className="modal-input"
          type="text"
          readOnly
          value={getShareUrl()}
        />
        <button className="modal-button" type="button" onClick={copyUrl}>
          Copy
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, title, data, project_id },
    dashboardsMenu,
    accessKey
  } = state;
  return {
    id,
    title,
    data,
    project_id,
    dashboardsMenu,
    accessKey
  };
};

const mapDispatchToProps = dispatch => ({
  toggleDashboardsMenu: () => dispatch(toggleDashboardsMenu()),
  setAccessKey: value => dispatch(setAccessKey(value)),
  clearAccessKey: () => dispatch(clearAccessKey()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShareDashboards)
);
