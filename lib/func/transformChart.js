import { generateUniqueId } from '../utils/generateUniqueId';

const transformChart = chart => {
  return chart.id !== undefined ? chart : { ...chart, id: generateUniqueId() };
};

export default transformChart;
