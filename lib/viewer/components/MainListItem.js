import React from "react";
import { Link } from "react-router-dom";
import MainListItemButtons from "./MainListItemButtons";

const MainListItem = ({ index, title, id, version }) => {
  const link = version === "editor" ? `/editor/${id}` : `/viewer/${id}`;
  return (
    <div className="dashboard-list-item">
      <Link to={link}>
        <div className="dashboard-list-item-box">{title}</div>
      </Link>
      {version === "editor" && <MainListItemButtons index={index} />}
    </div>
  );
};

export default MainListItem;