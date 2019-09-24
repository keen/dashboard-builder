import React from 'react';
import { connect } from 'react-redux';
import { handleSearch, changeSorting } from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewDashboardButton from '../../builder/components/NewDashboardButton';
import Select from 'react-select';

const MainTopToolbar = props => {
  const { version, sortingValue } = props;

  const sortOptions = [
    { value: 'az', label: 'A - Z' },
    { value: 'za', label: 'Z - A' },
    { value: 'latest', label: 'Latest first' },
    { value: 'oldest', label: 'Oldest first' }
  ];

  return (
    <div className="top-toolbar">
      {version === 'editor' && <NewDashboardButton />}
      <div className="search">
        <FontAwesomeIcon icon="search" size="sm" />
        <input
          type="text"
          placeholder="Search"
          onChange={e => props.handleSearch(e.target.value)}
        />
      </div>
      <div className="sorting-select">
        <Select
          value={sortingValue}
          onChange={e => props.changeSorting(e)}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { sortingValue } = state;
  return {
    sortingValue
  };
};

const mapDispatchToProps = {
  handleSearch,
  changeSorting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTopToolbar);
