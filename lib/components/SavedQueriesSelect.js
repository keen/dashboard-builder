import React from "react";

const savedQueries = [
  {
    name: "Actions and purchases",
    query: "actions-and-purchases"
  },
  {
    name: "Games purchases",
    query: "games-purchases"
  },
  {
    name: "Mobile sales",
    query: "mobile-sales"
  },
  {
    name: "Books purchases",
    query: "books-purchases"
  }
];

const SavedQueriesSelect = ({selectSavedQuery, index}) => {
  return (
    <div className="saved-select">
      <select onChange={e => selectSavedQuery(e, index)}>
        <option value="">Select saved query</option>
        {savedQueries.map((el, i) => (
          <option key={i} value={el.query}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SavedQueriesSelect;
