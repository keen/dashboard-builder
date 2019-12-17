import WebFont from 'webfontloader';

const getFontsList = dashboard => {
  const fonts = new Set();
  const { settings } = dashboard;
  if (settings.charts_theme && Object.keys(settings.charts_theme).length) {
    Object.keys(settings.charts_theme).forEach(item => {
      if (item) {
        Object.keys(settings.charts_theme[item]).reduce((acc, key) => {
          if (key.includes('font_family') && item.theme[key]) {
            acc.add(item.theme[key]);
          }
          return acc;
        }, fonts);
      }
    });

    // settings.charts_theme.forEach(item => {
    //   if (item) {
    //     Object.keys(item.theme).reduce((acc, key) => {
    //       if (key.includes('font_family') && item.theme[key]) {
    //         acc.add(item.theme[key]);
    //       }
    //       return acc;
    //     }, fonts);
    //   }
    // });
  }

  if (settings.theme && settings.theme.theme) {
    const { theme } = settings.theme;
    Object.keys(theme).reduce((acc, key) => {
      if (key.includes('font_family') && theme[key]) {
        acc.add(theme[key]);
      }
      return acc;
    }, fonts);
  }

  return Array.from(fonts);
};

const loadFontsFromDashboard = dashboard => {
  const fonts = getFontsList(dashboard);
  if (fonts.length) {
    WebFont.load({
      google: {
        families: fonts
      }
    });
  }
};

export default loadFontsFromDashboard;
