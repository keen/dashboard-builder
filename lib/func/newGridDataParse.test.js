import newGridDataParse from './newGridDataParse';

describe('newGridDataParse()', () => {
  it('should parse data correctly', () => {
    const dashboardInfo = {
      data: {
        items: [
          {
            height: 40,
            left: 20,
            text: '<p>Component</p>',
            top: 20,
            type: 'paragraph',
            width: 1160
          },
          {
            height: 2800,
            left: 620,
            chartTitle: 'Title',
            top: 80,
            savedQuery: [
              {
                label: 'Saved query',
                value: 'saved_query'
              }
            ],
            type: 'bar',
            width: 560
          }
        ]
      }
    };
    const chartUniqueId = jest
      .fn()
      .mockImplementation(() => '1433be06-9dfa-4caf-8558-f5959e0535eb')
      .mockImplementation(() => '76d83720-c703-4127-ad92-7cd37d1ea893')
      .mockImplementation(() => '7a99a8d0-bf4f-429b-8bb7-520bf069ac59');
    const parsedData = newGridDataParse(dashboardInfo, chartUniqueId);
    expect(parsedData).toMatchSnapshot();
  });
});
