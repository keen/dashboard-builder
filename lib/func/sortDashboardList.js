/* eslint-disable */

const sortDashboardList = (sortOption, arrayToSort) => {
  switch (sortOption) {
    case 'az':
      return arrayToSort.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });

    case 'za':
      return arrayToSort.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });

    case 'latest':
      return arrayToSort.sort((a, b) => {
        if (new Date(a.last_modified_date) < new Date(b.last_modified_date)) {
          return 1;
        }
        if (new Date(a.last_modified_date) > new Date(b.last_modified_date)) {
          return -1;
        }
        return 0;
      });

    case 'oldest':
      return arrayToSort.sort((a, b) => {
        if (new Date(a.last_modified_date) < new Date(b.last_modified_date)) {
          return -1;
        }
        if (new Date(a.last_modified_date) > new Date(b.last_modified_date)) {
          return 1;
        }
        return 0;
      });

    default:
      break;
  }
};

export default sortDashboardList;
