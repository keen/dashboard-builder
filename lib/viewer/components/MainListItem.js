import React from 'react';
import { Link } from 'react-router-dom';
import MainListItemButtons from './MainListItemButtons';
import ReactTimeAgo from 'react-time-ago';

const MainListItem = ({
  title,
  id,
  version,
  last_modified_date,
  is_public
}) => {
  const link = `/viewer/${id}`;
  return (
    <div className="dashboard-list-item">
      <Link to={link}>
        <div className="dashboard-list-item-box">
          {title}
          <ReactTimeAgo date={new Date(last_modified_date)} />
        </div>
      </Link>
      {version === 'editor' && (
        <MainListItemButtons id={id} is_public={is_public} />
      )}
    </div>
  );
};

export default MainListItem;
