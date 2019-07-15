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
      title: d.title,
      data: {
        version: 2,
        items: d.rows.map((r, i) => {
          topPosition += r.height;
          return r.tiles.map((t, j) => {
            let prevElWidth = 0;
            if (j !== 0) {
              prevElWidth =
                ((1200 - 40 - (r.tiles.length - 1) * grid) / 12) *
                r.tiles[j - 1].column_width;
            }
            const elWidth =
              r.tiles.length === 3 && j === 2
                ? ((1200 - 40 - (r.tiles.length - 1) * grid) / 12) *
                    t.column_width -
                  20
                : r.tiles.length === 2 && j === 1 && t.column_width === 6
                ? ((1200 - 40 - (r.tiles.length - 1) * grid) / 12) *
                    t.column_width -
                  20
                : ((1200 - 40 - (r.tiles.length - 1) * grid) / 12) *
                  t.column_width;
            return {
              chartTitle: "",
              height: Math.round(r.height / grid) * grid,
              width: Math.round(elWidth / grid) * grid,
              top: topPosition - r.height + i * grid,
              left:
                r.tiles.length === 3 && j === 2
                  ? Math.round((grid + j * prevElWidth + j * grid) / grid) *
                      grid +
                    20
                  : Math.round((grid + j * prevElWidth + j * grid) / grid) * grid,
              legend: { value: "right", label: "Right" },
              sparkline: { value: false, label: "No" },
              stacking: { value: "", label: "None" },
              savedQuery: [
                {
                  value: t.query_name,
                  label: typeForSelect(t.query_name)
                }
              ]
            };
          });
        }),
      },
      settings: {
        dryRun: false
      }
    };
  });
  const translateOldDashboards = firstOldDashboards.map(d => {
    let oneArray = [];
    d.data.items.forEach(r => {
      oneArray.push(...r);
    });
    return {
      ...d,
      data: {
        ...d.data,
        items: oneArray
      }
    };
  });
  return translateOldDashboards;
}
