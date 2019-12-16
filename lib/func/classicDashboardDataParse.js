export default function classicDashboardDataParse(oldDashboard, chartId) {
  const typeForSelect = (item = '') => {
    if (!item) return '';
    const label = item.replace(/-/g, ' ');
    return label.charAt(0).toUpperCase() + label.slice(1);
  };
  let rowTitle;
  let topPosition = 0;
  const firstOldDashboards = {
    ...oldDashboard,
    settings: {
      items: oldDashboard.rows.map(r => {
        topPosition += Math.floor(r.height/100);
        if (r.title) {
          rowTitle = {
            i: chartId,
            type: 'paragraph',
            text: `<h1>${r.title}</h1>`,
            y: topPosition - Math.floor(r.height/100),
            x: 0,
            h: 1,
            w: 12
          };
          topPosition += 2;
        }
        const elements = r.tiles.map((t, j) => {
          let prevElWidth = 0;
          if (j !== 0) {
            prevElWidth = r.tiles[j - 1].column_width;
          }
          let elHeight = Math.floor(r.height/100);
          return {
            i: chartId,
            h: elHeight * 4,
            w: t.column_width,
            y: topPosition - elHeight,
            x: prevElWidth,
            sparkline: false,
            savedQuery: [
              {
                value: t.query_name,
                label: typeForSelect(t.query_name)
              }
            ]
          };
        });
        if (r.title) {
          elements.unshift(rowTitle);
        }
        return elements;
      }),
      dryRun: false
    },
  };
  let oneArray = [];
  firstOldDashboards.settings.items.forEach(r => {
    oneArray.push(...r);
  });
  const translateOldDashboards = {
    ...firstOldDashboards,
    settings: {
      ...firstOldDashboards.settings,
      items: oneArray,
      layout: oneArray,
    }
  };
  return translateOldDashboards;
}
