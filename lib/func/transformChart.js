import { generateUniqueId } from '../utils/generateUniqueId';

const transformChart = chart => {
  return chart.id !== undefined
    ? chart
    : { ...chart, id: `chart-${generateUniqueId()}` };
};

export default transformChart;
