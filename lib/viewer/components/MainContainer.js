import React, { useEffect } from "react";
import { connect } from "react-redux";
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";
import { addDashboardItem } from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainContainer = ({
  dashboardList,
  isDashboardListLoaded,
  searchInput,
  version,
  addDashboardItem
}) => {
  const list = dashboardList.filter(
    el =>
      searchInput === "" ||
      el.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (isDashboardListLoaded && !list.length) {
      addDashboardItem("My first dashboard");
    }
  });

  return (
    <div className="dashboard-builder container">
      <MainTopToolbar version={version} />
      {list.length ? (
        list.map(({ title, id }, i) => {
          return (
            <MainListItem
              key={id}
              id={id}
              title={title}
              index={i}
              version={version}
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
              <FontAwesomeIcon icon="spinner" />
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addDashboardItem: element => dispatch(addDashboardItem(element))
});

const mapStatetoProps = state => {
  const { dashboardList, isDashboardListLoaded, searchInput } = state;
  return {
    dashboardList,
    isDashboardListLoaded,
    searchInput
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainContainer);
