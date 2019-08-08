import React, { useEffect } from "react";
import { connect } from "react-redux";
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";
import { addDashboardItem } from "../../actions/rootActions";

const MainContainer = ({ dashboardList, isDashboardListLoaded, searchInput, version, addDashboardItem }) => {
  const list = dashboardList.filter(
    el =>
      searchInput === "" ||
      el.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (isDashboardListLoaded && !list.length) {
      addDashboardItem('My first dashboard');
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
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addDashboardItem: element => dispatch(addDashboardItem(element)),
});

const mapStatetoProps = state => {
  const { dashboardList, isDashboardListLoaded, searchInput } = state;
  return {
    dashboardList,
    isDashboardListLoaded,
    searchInput
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(MainContainer);
