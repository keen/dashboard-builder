import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import KeenExplorer from 'keen-explorer';
import { client } from 'Client/index';

const Explorer = props => {
  useEffect(() => {
    new KeenExplorer({
      container: '#dashboard-builder-explorer',
      keenAnalysis: {
        config: {
          projectId: client.projectId(),
          masterKey: client.masterKey(),
          readKey: client.readKey()
        }
      },
      components: {
        results: false
      },
      ...props
    });
  }, []);

  return <div id="dashboard-builder-explorer" />;
};

export default Explorer;

Explorer.propTypes = {
  container: PropTypes.string,
  keenAnalysis: PropTypes.shape({
    projectId: PropTypes.string,
    masterKey: PropTypes.string,
    readKey: PropTypes.string
  })
};
