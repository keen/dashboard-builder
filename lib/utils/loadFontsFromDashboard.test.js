import WebFont from 'webfontloader';
import loadFontsFromDashboard from './loadFontsFromDashboard';

jest.mock('webfontloader', () => ({
  load: jest.fn()
}));

describe('loadFontsFromDashboard', () => {
  const dashboardWithDifferentFonts = {
    settings: {
      someProp: 1,
      charts_theme: {
        chart1: {
          options: {},
          theme: {
            background: 'yellow',
            base_font_family: 'Arial',
            base_font_size: '16px',
            title_font_family: 'Helvetica',
            title_font_size: '24px'
          }
        }
      },
      theme: {
        options: {},
        theme: {
          background: 'red',
          base_font_family: 'Times New Roman',
          base_font_size: '14px'
        }
      }
    }
  };

  const dashboardWithDuplicatedFonts = {
    settings: {
      someProp: 1,
      charts_theme: {
        chart1: {
          options: {},
          theme: {
            background: 'yellow',
            base_font_family: 'Arial',
            base_font_size: '16px',
            title_font_family: 'Arial',
            title_font_size: '24px'
          }
        }
      },
      theme: {
        options: {},
        theme: {
          background: 'red',
          base_font_family: 'Arial',
          base_font_size: '14px'
        }
      }
    }
  };

  it('should return a list of fonts', () => {
    loadFontsFromDashboard(dashboardWithDifferentFonts);
    expect(WebFont.load).toHaveBeenCalledWith({
      google: { families: ['Arial', 'Helvetica', 'Times New Roman'] }
    });
  });

  it('should not return duplicated fonts', () => {
    loadFontsFromDashboard(dashboardWithDuplicatedFonts);
    expect(WebFont.load).toHaveBeenCalledWith({
      google: { families: ['Arial'] }
    });
  });
});
