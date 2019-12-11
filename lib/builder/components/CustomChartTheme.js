import React from 'react';
import { getStyles } from 'keen-theme-builder';

const CustomChartTheme = props => {
  const { theme, containerId } = props;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: getStyles(theme, containerId)
        }}
      />
      {props.children}
    </>
  );
};

export default CustomChartTheme;
