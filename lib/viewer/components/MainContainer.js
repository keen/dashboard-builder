import React from 'react';
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";

const MainContainer = ({dashboardList, searchInput, handleSearch, addDashboardItem, deleteDashboardItem}) => {
  const list = dashboardList.filter(
    el =>
      searchInput === "" ||
      el.dashboardTitle.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="container">
      <MainTopToolbar
        handleSearch={handleSearch}
        addDashboardItem={addDashboardItem}
      />
      {list.length ? (
        list.map(({ dashboardTitle }, i) => {
          return (
            <MainListItem
              key={i}
              dashboardTitle={dashboardTitle}
              index={i}
              deleteDashboardItem={deleteDashboardItem}
            />
          );
        })
      ) : (
        <div className="message">No dashboards found...</div>
      )}
    </div>
  );
}

export default MainContainer;
