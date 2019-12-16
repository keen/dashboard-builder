import classicDashboardDataParse from './classicDashboardDataParse';

describe('classicDashboardDataParse()', () => {
  it('should parse data correctly', () => {
    const dashboardInfo = {
      rows: [
        {
          height: 280,
          tiles: [
            {
              column_width: 6,
              query_name: 'users'
            },
            {
              column_width: 6,
              query_name: 'sales'
            }
          ],
          title: 'Users and sales'
        }
      ]
    }
    const parsedData = classicDashboardDataParse(dashboardInfo, '19c7a585-82ac-4e83-bbd4-b8757b445c4e');
    expect(parsedData).toMatchSnapshot();
  });
});