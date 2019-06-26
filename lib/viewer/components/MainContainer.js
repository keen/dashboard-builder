import React from "react";
import { connect } from 'react-redux';
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";

const MainContainer = ({
  dashboardList,
  searchInput,
  version
}) => {
  const list = dashboardList.filter(
    el =>
      searchInput === "" ||
      el.dashboardTitle.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="container">
      <MainTopToolbar version={version} />
      {list.length ? (
        list.map(({ dashboardTitle, id }, i) => {
          return (
            <MainListItem
              key={id}
              id={id}
              dashboardTitle={dashboardTitle}
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

const mapStatetoProps = state => ({
  dashboardList: state.mainReducer.dashboardList,
  searchInput:  state.mainReducer.searchInput
})

export default connect(mapStatetoProps)(MainContainer);
