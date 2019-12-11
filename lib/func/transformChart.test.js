import transformChart from './transformChart';

describe('transformChart', () => {
  const chartWithId = {
    data: {},
    id: 1
  };

  const chartNoId = {
    data: {}
  };

  it('should not add chart id', () => {
    const transformedChart = transformChart(chartWithId);
    expect(transformedChart).toEqual(chartWithId);
  });

  it('should add chart id', () => {
    const transformedChart = transformChart(chartNoId);
    expect(transformedChart.id).toBeTruthy();
  });
});
