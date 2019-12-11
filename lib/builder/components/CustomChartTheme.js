import React from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';
import { getStyles } from 'keen-theme-builder';

const CustomChartTheme = props => {
  const { chartOptions, containerId, ...otherOptions } = props;
  const options = { ...otherOptions, ...chartOptions.options };
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: getStyles(chartOptions.theme, containerId)
        }}
      />
      <Chart {...options} />
    </>
  );
};

export default CustomChartTheme;
