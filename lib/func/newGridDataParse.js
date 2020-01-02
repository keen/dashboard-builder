const newGridDataParse = (dashboardInfo, chartId) => {
  const { items } = dashboardInfo.data;
  const newGridItems = items.map(chart => {
    return {
      ...chart,
      i: chartId(),
      w: Math.floor(chart.width / 100),
      h: Math.floor(chart.height / 100) * 3,
      x: Math.floor(chart.left / 100),
      y: Math.floor(chart.top / 100)
    };
  });
  const newDashboardInfo = {
    ...dashboardInfo,
    settings: {
      ...dashboardInfo.settings,
      layout: [...newGridItems],
      items: [...newGridItems]
    }
  };
  return newDashboardInfo;
};

export default newGridDataParse;
