import React from "react";
import { connect } from "react-redux";
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";

const MainContainer = ({ dashboardList, searchInput, version }) => {
  const list = dashboardList.filter(
    el =>
      searchInput === "" ||
      el.title.toLowerCase().includes(searchInput.toLowerCase())
  );
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
    </div>
  );
};

const mapStatetoProps = state => {
  const { dashboardList, searchInput } = state;
  return {
    dashboardList,
    searchInput
  };
};

export default connect(mapStatetoProps)(MainContainer);
