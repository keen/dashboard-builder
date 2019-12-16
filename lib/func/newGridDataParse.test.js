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
            savedQuery: [{
              label: 'Saved query',
              value: 'saved_query'
            }],
            type: 'bar',
            width: 560
          }
        ]
      }
    }
    const parsedData = newGridDataParse(dashboardInfo, '19c7a585-82ac-4e83-bbd4-b8757b445c4e');
    expect(parsedData).toMatchSnapshot();
  });
});