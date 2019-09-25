import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainTopToolbar from './MainTopToolbar';
import MainListItem from './MainListItem';
import { addDashboardItem } from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash/isEqual';

const MainContainer = ({
  dashboardList,
  isDashboardListLoaded,
  searchInput,
  version,
  addDashboardItem
}) => {
  let list = dashboardList.filter(
    el =>
      searchInput === '' ||
      (el.title && el.title.toLowerCase().includes(searchInput.toLowerCase()))
  );

  useEffect(() => {
    if (isDashboardListLoaded && !list.length) {
      addDashboardItem('My first dashboard');
    }
    if (!isEqual(dashboardList, list)) {
      list = dashboardList.filter(
        el =>
          searchInput === '' ||
          (el.title &&
            el.title.toLowerCase().includes(searchInput.toLowerCase()))
      );
    }
  });

  return (
    <div className="dashboard-builder container">
      <MainTopToolbar version={version} />
      {list.length ? (
        list.map(({ title, id, last_modified_date }, i) => {
          return (
            <MainListItem
              key={id}
              id={id}
              title={title}
              index={i}
              version={version}
              last_modified_date={last_modified_date}
            />
          );
        })
      ) : (
        <div className="message">No dashboards found...</div>
      )}
      {!isDashboardListLoaded && (
        <React.Fragment>
          <div className="modal-cover" />
          <div className="new-chart-info">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" size="1x" />
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  addDashboardItem
};

const mapStatetoProps = state => {
  const {
    dashboardList,
    isDashboardListLoaded,
    searchInput,
    sortingValue
  } = state;
  return {
    dashboardList,
    isDashboardListLoaded,
    searchInput,
    sortingValue
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainContainer);
