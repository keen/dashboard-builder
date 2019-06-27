import { oldDashboards } from "../../config/data";

export default function editorParse() {
  const typeForSelect = item => {
    const label = item.replace(/-/g, " ");
    return label.charAt(0).toUpperCase() + label.slice(1);
  };
  const grid = 20;
  const firstOldDashboards = oldDashboards.map(d => {
    let topPosition = 20;
    return {
      id: d.id,
      dashboardTitle: d.title,
      dashboardData: d.rows.map((r, i) => {
        topPosition += r.height;
        return r.tiles.map((t, j) => {
          const elWidth =
            ((1200 - 40 - (r.tiles.length - 1) * grid) / 12) *
            t.column_width;
          return {
            chartTitle: "",
            height: r.height,
            width: Math.round(elWidth / grid) * grid,
            top: topPosition - r.height + i * grid,
            left: Math.round((grid + j * (Math.round(elWidth / grid) * grid) + grid * j) / grid) * grid,
            legend: { value: "right", label: "Right" },
            sparkline: { value: false, label: "No" },
            stacking: { value: "", label: "None" },
            savedQuery: {value: t.query_name, label: typeForSelect(t.query_name)},
          };
        });
      }),
      dryRun: false,
    };
  });
  const translateOldDashboards = firstOldDashboards.map(d => {
    let oneArray = [];
    d.dashboardData.forEach(r => {
      oneArray.push(...r);
    });
    return {
      ...d,
      dashboardData: oneArray
    };
  });
  return translateOldDashboards;
};