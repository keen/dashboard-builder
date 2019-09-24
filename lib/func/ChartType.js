import _ from 'lodash';

const ChartTypeUtils = {
  getQueryDataType: function(query) {
    var isInterval = typeof query.interval === 'string';
    var isGroupBy =
      typeof query.group_by === 'string' ||
      (query.group_by instanceof Array && query.group_by.length === 1);
    var is2xGroupBy =
      query.group_by instanceof Array && query.group_by.length === 2;
    var dataType;

    if (query.analysis_type === 'funnel') {
      dataType = 'cat-ordinal';
    } else if (query.analysis_type === 'extraction') {
      dataType = 'extraction';
    } else if (query.analysis_type === 'select_unique') {
      dataType = 'nominal';
    }

    // metric
    else if (!isGroupBy && !isInterval && !is2xGroupBy) {
      dataType = 'singular';
    }

    // group_by, no interval
    else if (isGroupBy && !isInterval) {
      dataType = 'categorical';
    }

    // interval, no group_by
    else if (isInterval && (!isGroupBy && !is2xGroupBy)) {
      dataType = 'chronological';
    }

    // interval, group_by
    else if (isInterval && (isGroupBy || is2xGroupBy)) {
      dataType = 'cat-chronological';
    }

    // 2x group_by
    // TODO: research possible dataType options
    else if (!isInterval && is2xGroupBy) {
      dataType = 'categorical';
    }

    return dataType;
  },

  getChartTypeOptions: function(query) {
    var dataTypes = {
      singular: ['metric'],
      categorical: [
        'pie',
        'bar',
        'choropleth',
        'horizontal-bar',
        'donut',
        'table'
      ],
      'cat-interval': [
        'area',
        'bar',
        'horizontal-bar',
        'line',
        'spline',
        'area-spline',
        'step',
        'area-step',
        'table'
      ],
      'cat-ordinal': [
        'area',
        'bar',
        'horizontal-bar',
        'line',
        'spline',
        'area-spline',
        'step',
        'area-step',
        'table',
        'funnel',
        'funnel-3d',
        'horizontal-funnel',
        'horizontal-funnel-3d'
      ],
      chronological: [
        'area',
        'bar',
        'line',
        'spline',
        'area-spline',
        'step',
        'area-step',
        'table'
      ],
      'cat-chronological': [
        'area',
        'bar',
        'horizontal-bar',
        'line',
        'spline',
        'area-spline',
        'step',
        'area-step',
        'table'
      ],
      nominal: ['table'],
      extraction: ['table']
    };
    var queryDataType = ChartTypeUtils.getQueryDataType(query);
    return dataTypes[queryDataType];
  },

  responseSupportsChartType: function(query, chartType) {
    return _.includes(ChartTypeUtils.getChartTypeOptions(query), chartType);
  },

  isTableChartType: function(chartType) {
    return chartType == 'table';
  }
};

export default ChartTypeUtils;
