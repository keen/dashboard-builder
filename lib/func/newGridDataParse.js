const newGridDataParse = (dashboardInfo, chartId) => {
  const { items } = dashboardInfo.data;
  const newDashboardInfo = {
      ...dashboardInfo,
      settings: {
        ...dashboardInfo.settings,
        layout: items.map(chart => {
          return {
            i: chartId,
            w: Math.floor(chart.width / 100),
            h: Math.floor(chart.height / 100) * 3,
            x: Math.floor(chart.left / 100),
            y: Math.floor(chart.top / 100),
            moved: false,
            static: false
          };
        }),
        items: items.map(chart => {
          const deleteKeys = ['width', 'height', 'top', 'left'];
          return {
            ...Object.keys(chart)
              .filter(key => !deleteKeys.includes(key))
              .reduce((obj, key) => {
                obj[key] = chart[key];
                return obj;
              }, {}),
            i: chartId,
            w: Math.floor(chart.width / 100),
            h: Math.floor(chart.height / 100) * 3,
            x: Math.floor(chart.left / 100),
            y: Math.floor(chart.top / 100)
          };
        })
      }
    };
  return newDashboardInfo;
};

export default newGridDataParse;
