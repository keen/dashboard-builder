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
    };
    const chartUniqueId = jest
      .fn()
      .mockImplementation(() => '1433be06-9dfa-4caf-8558-f5959e0535eb')
      .mockImplementation(() => '76d83720-c703-4127-ad92-7cd37d1ea893')
      .mockImplementation(() => '7a99a8d0-bf4f-429b-8bb7-520bf069ac59');
    const parsedData = classicDashboardDataParse(dashboardInfo, chartUniqueId);
    expect(parsedData).toMatchSnapshot();
  });
});
