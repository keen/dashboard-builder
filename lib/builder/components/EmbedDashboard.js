import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Prism from 'prismjs';
import {
  toggleDashboardsMenu,
  setAccessKey,
} from "../../actions/rootActions";
import getKeyFromAPI from '../../func/getKeyFromAPI';
import copyToClipboard from '../../func/copyToClipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmbedDashboards = props => {
  useEffect(() => {
    if (!props.accessKey) {
      getKeyFromAPI(props.dashboardInfo.data, props.title).then(data => props.setAccessKey(data));
    }
  }, []);

  const code = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-dashboard-builder@latest/dist/viewer.min.js"></script>
    </head>
    <body>
      <div id="viewer"></div>
      <script>
        const dashboardInfo = ${JSON.stringify(props.dashboardInfo)};
        const projectId = "${props.dashboardInfo.project_id}";
        const masterKey = "${props.accessKey}";

        const myDashboardViewer = new DashboardViewer({
          container: "#viewer",
          isDashboardPublic: true,
          dashboardInfo,
          keenAnalysis: {
            config: {
              projectId,
              masterKey,
            }
          }
        });
      </script>
    </body>
  </html>`;

  const prismedHtml = Prism.highlight(code, Prism.languages.html, 'html');

  return (
    <div className="embed-dashboard modal">
      <div className="modal-header">
        Embed Dashboard
        <FontAwesomeIcon icon="times" onClick={props.toggleDashboardsMenu} />
      </div>
      <div className="modal-body">
        <div className="prism" dangerouslySetInnerHTML={{__html: prismedHtml}} />
        <button type="button" className="modal-button" onClick={() => copyToClipboard(code)}>
          <FontAwesomeIcon icon="copy" />
          COPY
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const {
    dashboardInfo,
    accessKey
  } = state;
  return {
    dashboardInfo,
    accessKey
  };
};

const mapDispatchToProps = dispatch => ({
  toggleDashboardsMenu: () => dispatch(toggleDashboardsMenu()),
  setAccessKey: value => dispatch(setAccessKey(value)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmbedDashboards)
);