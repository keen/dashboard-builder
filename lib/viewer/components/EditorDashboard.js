/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  dropHandler,
  moveChart,
  stopMoveChart,
  showSettings,
  mapOldItems,
  colMoveChart
} from '../../actions/rootActions';
import checkBoundaries from '../../func/checkBoundaries';
import editorParse from '../../func/oldDashboardDataParse';
import calculateCollisions from '../../func/calculateCollisions';
import Resizers from '../../builder/components/Resizers';
import Paragraph from '../../builder/components/Paragraph';
import Image from '../../builder/components/Image';
import ChartContainer from '../../builder/components/ChartContainer';
import Buttons from '../../builder/components/Buttons';
import ExplorerButton from './ExplorerButton';

import KeenAnalysisContext from '../../contexts/keenAnalysis';

import css from 'styled-jsx/css';

class EditorDashboard extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.parsedItems = [];
    this.switchedElem = {};
    this.moveCount = 0;
    this.movePosXY = {};
  }

  componentDidUpdate() {
    if (
      this.props.isMoving === undefined &&
      this.props.isResizing === undefined
    ) {
      this.moveCollided();
    }
  }

  moveCollided = () => {
    const {
      dashboardInfo: {
        data: { items }
      },
      isMoving
    } = this.props;
    if (items) {
      for (let index = 0; index < items.length; index++) {
        for (let second = 0; second < items.length; second++) {
          if (index !== second && index > second) {
            const important =
              isMoving !== undefined
                ? isMoving
                : items[index].top <= items[second].top
                ? index
                : second;
            const lessImportant =
              isMoving !== undefined
                ? isMoving === index
                  ? second
                  : index
                : items[index].top <= items[second].top
                ? second
                : index;
            const col = calculateCollisions(
              items[lessImportant],
              items[important],
              isMoving
            );
            if (col.collision) {
              const { top, left, width } = items[lessImportant];
              const moveY = col.side.includes('top')
                ? top - col.height
                : top + col.height;
              const moveX = col.side.includes('left')
                ? left - col.width
                : left + col.width;
              if (col.side === 'all') {
                this.props.colMoveChart(
                  lessImportant,
                  this.switchedElem.left,
                  this.switchedElem.top
                );
                this.props.colMoveChart(isMoving, left, top);
                return;
              }
              let posY =
                moveY < 20
                  ? Math.abs(moveY) === items[lessImportant].height - 20
                    ? Math.abs(moveY)
                    : 20
                  : moveX <= 0 || moveX + width >= 1200
                  ? items[important].top + items[important].height
                  : moveY;
              const posX =
                moveX <= 20 ? 20 : moveX + width >= 1180 ? 1180 - width : moveX;
              if (
                !this.movePosXY ||
                (this.movePosXY.posX !== posX && this.movePosXY.posY !== posY)
              ) {
                this.movePosXY = {
                  posX,
                  posY
                };
                this.moveCount = 0;
              }
              this.movePosXY.posX === posX &&
                this.movePosXY.posY === posY &&
                this.moveCount;
              if (this.moveCount > 20) {
                posY += 100;
              }
              this.props.colMoveChart(lessImportant, posX, posY);
              this.moveCount++;
            }
          }
        }
      }
    }
  };

  dropHandler = e => {
    const { grid, draggedType, palette, colors, data } = this.props;
    const top = Math.round(e.pageY / grid) * grid - grid;
    const left =
      Math.round(
        (e.pageX - this.ref.current.getBoundingClientRect().left) / grid
      ) *
        grid -
      grid;
    const width = 500;
    const height = 300;
    const newElement = {
      id: data.items.length,
      type: draggedType,
      ...checkBoundaries(
        top,
        left,
        width,
        this.ref.current.getBoundingClientRect()
      ),
      width,
      height,
      palette: palette ? palette.value : '',
      colors: colors || [],
      legend: { value: 'right', label: 'Right' },
      sparkline: true,
      stacking: { value: '', label: 'None' },
      savedQuery: []
    };
    e.preventDefault();
    this.props.dropHandler(newElement);
    this.moveCollided();
  };

  dragOverHandler = e => {
    e.preventDefault();
  };

  moveChart = (event, index) => {
    this.switchedElem = {
      top: this.props.dashboardInfo.data.items[index].top,
      left: this.props.dashboardInfo.data.items[index].left
    };
    const posX = event.pageX;
    const posY = event.pageY;
    if (this.props.settingsVisible !== index) {
      this.props.showSettings(index);
    }
    const startMove = e => {
      if (Math.abs(posX - e.pageX) > 15 || Math.abs(posY - e.pageY) > 15) {
        this.props.moveChart(
          index,
          e.pageX,
          e.pageY,
          this.ref.current.getBoundingClientRect()
        );
      }
    };
    const stopMove = () => {
      if (this.props.isMoving !== undefined) {
        this.moveCollided();
      }
      window.removeEventListener('mousemove', startMove, false);
      this.props.stopMoveChart();
    };
    window.addEventListener('mousemove', startMove, false);
    window.addEventListener('mouseup', stopMove, false);
    event.stopPropagation();
  };

  mapTextAnchor = value => {
    switch (value) {
      case 'left':
        return 'end';
      case 'right':
        return 'start';
      default:
        return 'middle';
    }
  };

  getCSSRules = (state = {}) => ({
    chartBackground: state['appearance.background']
      ? `background-color: ${state['appearance.background']};`
      : 'background-color: inherit;',
    chartBorder: state['appearance.border']
      ? `border-color: ${state['appearance.border']};`
      : 'border-color: inherit;',
    chartFont: state['appearance.font.family']
      ? `font-family: "${state['appearance.font.family']}";`
      : 'font-family: inherit;',
    titleTextAlign: `text-align: ${state['title.textAlign']};`,
    titleColor: state['title.color']
      ? `color: ${state['title.color']};`
      : 'color: inherit;',
    titleFontFamily: state['title.font.family']
      ? `font-family: "${state['title.font.family']}";`
      : 'font-family: inherit;',
    titleFontSize:
      state['title.font.size'] !== 'auto'
        ? `font-size: ${state['title.font.size']}px;`
        : 'font-size: inherit;',
    titleFontBold: state['title.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    titleFontItalic: state['title.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    subtitleTextAlign: `text-align: ${state['subtitle.textAlign']};`,
    subtitleColor: state['subtitle.color']
      ? `color: ${state['subtitle.color']};`
      : 'color: inherit;',
    subtitleFontFamily: state['subtitle.font.family']
      ? `font-family: "${state['subtitle.font.family']}";`
      : 'font-family: inherit;',
    subtitleFontSize:
      state['subtitle.font.size'] !== 'auto'
        ? `font-size: ${state['subtitle.font.size']}px;`
        : 'font-size: inherit;',
    subtitleFontBold: state['subtitle.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    subtitleFontItalic: state['subtitle.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    axisYTitleFont: state['axis.vertical.title.font.family']
      ? `font-family: "${state['axis.vertical.title.font.family']}";`
      : 'font-family: inherit;',
    axisYTitleFontSize:
      state['axis.vertical.title.font.size'] !== 'auto'
        ? `font-size: ${state['axis.vertical.title.font.size']}px;`
        : 'font-size: inherit;',
    axisYTitleFontBold: state['axis.vertical.title.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    axisYTitleFontItalic: state['axis.vertical.title.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    axisYTitleColor: state['axis.vertical.title.color']
      ? `fill: ${state['axis.vertical.title.color']};`
      : 'fill: inherit;',
    axisYLabelFont: state['axis.vertical.label.font.family']
      ? `font-family: "${state['axis.vertical.label.font.family']}";`
      : 'font-family: inherit;',
    axisYLabelFontSize:
      state['axis.vertical.label.font.size'] !== 'auto'
        ? `font-size: ${state['axis.vertical.label.font.size']}px;`
        : 'font-size: inherit;',
    axisYLabelFontBold: state['axis.vertical.label.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    axisYLabelFontItalic: state['axis.vertical.label.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    axisYLabelColor: state['axis.vertical.label.color']
      ? `fill: ${state['axis.vertical.label.color']};`
      : 'fill: inherit;',
    axisXTitleFont: state['axis.horizontal.title.font.family']
      ? `font-family: "${state['axis.horizontal.title.font.family']}";`
      : 'font-family: inherit;',
    axisXTitleFontSize:
      state['axis.horizontal.title.font.size'] !== 'auto'
        ? `font-size: ${state['axis.horizontal.title.font.size']}px;`
        : 'font-size: inherit;',
    axisXTitleFontBold: state['axis.horizontal.title.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    axisXTitleFontItalic: state['axis.horizontal.title.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    axisXTitleColor: state['axis.horizontal.title.color']
      ? `fill: ${state['axis.horizontal.title.color']};`
      : 'fill: inherit;',
    axisXLabelFont: state['axis.horizontal.label.font.family']
      ? `font-family: "${state['axis.horizontal.label.font.family']}";`
      : 'font-family: inherit;',
    axisXLabelFontSize:
      state['axis.horizontal.label.font.size'] !== 'auto'
        ? `font-size: ${state['axis.horizontal.label.font.size']}px;`
        : 'font-size: inherit;',
    axisXLabelFontBold: state['axis.horizontal.label.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    axisXLabelFontItalic: state['axis.horizontal.label.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    axisXLabelColor: state['axis.horizontal.label.color']
      ? `fill: ${state['axis.horizontal.label.color']};`
      : 'fill: inherit;',
    legendFont: state['legend.font.family']
      ? `font-family: "${state['legend.font.family']}";`
      : 'font-family: inherit;',
    legendFontSize:
      state['legend.font.size'] !== 'auto'
        ? `font-size: ${state['legend.font.size']}px;`
        : 'font-size: inherit;',
    legendFontBold: state['legend.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    legendFontItalic: state['legend.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    legendColor: state['legend.color']
      ? `color: ${state['legend.color']};`
      : 'color: inherit;',
    gridLineShow: state['grid.show']
      ? 'stroke-opacity: 1;'
      : 'stroke-opacity: 0;',
    gridLineColor: state['grid.lines.color']
      ? `stroke: ${state['grid.lines.color']}`
      : 'stroke: inherit;',
    subgridLineColor: state['subgrid.lines.color']
      ? `stroke: ${state['subgrid.lines.count']}`
      : 'stroke: inherit;',
    seriesLabelFont: state['series.label.font.family']
      ? `font-family: "${state['series.label.font.family']}";`
      : 'font-family: inherit;',
    seriesLabelFontSize:
      state['series.label.font.size'] !== 'auto'
        ? `font-size: ${state['series.label.font.size']}px;`
        : 'font-size: inherit;',
    seriesLabelFontBold: state['series.label.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    seriesLabelFontItalic: state['series.label.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    seriesLabelColor: state['series.label.color']
      ? `fill: ${state['series.label.color']} !important;`
      : 'fill: inherit;',
    seriesLabelTextAlign: `text-anchor: ${this.mapTextAnchor(
      state['series.label.textAlign']
    )} !important;`,
    seriesLineThickness: `stroke-width: ${state['series.line']}px;`,
    tooltipFont: state['tooltip.font.family']
      ? `font-family: "${state['tooltip.font.family']}";`
      : 'font-family: inherit;',
    tooltipFontSize:
      state['tooltip.font.size'] !== 'auto'
        ? `font-size: ${state['tooltip.font.size']}px;`
        : 'font-size: inherit;',
    tooltipFontBold: state['tooltip.font.bold']
      ? 'font-weight: bold;'
      : 'font-weight: inherit;',
    tooltipFontItalic: state['tooltip.font.italic']
      ? 'font-style: italic;'
      : 'font-style: inherit;',
    tooltipColor: state['tooltip.color']
      ? `color: ${state['tooltip.color']};`
      : 'color: inherit;',
    tooltipBackground: state['tooltip.background']
      ? `background-color: ${state['tooltip.background']};`
      : '',
    tooltipBorder:
      state['tooltip.border'] && state['tooltip.border'] !== 'transparent'
        ? `border-color: ${state['tooltip.border']};`
        : ''
  });

  render() {
    const {
      data,
      rows,
      dashboardInfo,
      isMoving,
      isResizing,
      settingsVisible,
      version,
      screenSize,
      picker = {},
      isDashboardPublic,
      keenAnalysis,
      id
    } = this.props;
    const { title, legend, label, chart, axis, tooltip, grid } = picker;
    let max = 0;
    let maxHeight = 0;
    if (dashboardInfo.id !== '' && !!data) {
      !data.items &&
        !!rows &&
        this.props.mapOldItems(editorParse(dashboardInfo));
      this.parsedItems = data.items;
      this.parsedItems &&
        this.parsedItems.forEach(el => {
          if (el.top + el.height > max) {
            max = el.top + el.height;
            maxHeight = max + 20;
          }
          if (isResizing !== undefined || isMoving !== undefined) {
            maxHeight += 400;
          }
        });
    }

    return (
      <div
        style={{
          height: screenSize === 'desktop' && maxHeight !== 0 && maxHeight
        }}
        ref={this.ref}
        className="dashboard"
        id={`dashboard-${id}`}
        onDrop={e => this.dropHandler(e)}
        onDragOver={e => this.dragOverHandler(e)}
      >
        {this.props.dashboardInfo.settings.theme &&
          this.props.dashboardInfo.settings.theme.style && (
            <style
              dangerouslySetInnerHTML={{
                __html: `${this.props.dashboardInfo.settings.theme.style}`
              }}
            />
          )}
        {dashboardInfo.id !== '' &&
          this.parsedItems &&
          this.parsedItems.map((el, index) => {
            const {
              id: chartId,
              top,
              left,
              width,
              height,
              type,
              src,
              text,
              savedQuery,
              error
            } = el;
            let zIndex = '';
            if (
              (index === isMoving && isMoving !== undefined) ||
              (index === isResizing && isResizing !== undefined)
            ) {
              zIndex = 101;
            }
            let opacity = 1;
            if (settingsVisible !== false && settingsVisible !== index) {
              opacity = 0.3;
            }
            if (
              version === 'editor' ||
              ((type === 'paragraph' && text) || (type === 'image' && src)) ||
              (version === 'viewer' &&
                (savedQuery.length !== 0 &&
                  (!error || !Object.keys(error).length)))
            ) {
              let screenSizeSettings = {};
              if (screenSize === 'desktop' || version === 'editor') {
                screenSizeSettings = {
                  top,
                  left,
                  position: 'absolute'
                };
              } else {
                screenSizeSettings = {
                  marginBottom: '20px',
                  width: '100%'
                };
              }
              const containerClass =
                type === 'heatmap' ? 'heatmap-container' : '';
              return (
                <div
                  style={{
                    width,
                    height,
                    opacity,
                    zIndex,
                    ...screenSizeSettings
                  }}
                  className={
                    version === 'viewer'
                      ? `chart-container-viewer ${containerClass}`
                      : `chart-container ${containerClass}`
                  }
                  key={index}
                  id={`chart-${id}-${chartId}`}
                >
                  {type === 'image' ? (
                    <Image src={src} index={index} />
                  ) : type === 'paragraph' ? (
                    <Paragraph text={text} index={index} />
                  ) : (
                    <ChartContainer
                      {...el}
                      index={index}
                      width={width}
                      height={height}
                      version={version}
                      keenAnalysis={keenAnalysis}
                    />
                  )}

                  {version === 'editor' && (
                    <React.Fragment>
                      <Resizers
                        index={index}
                        clientRect={
                          this.ref.current &&
                          this.ref.current.getBoundingClientRect()
                        }
                      />
                      <Buttons index={index} savedQuery={savedQuery} />
                      <div
                        className="chart-draggable"
                        onMouseDown={event => this.moveChart(event, index)}
                      />
                    </React.Fragment>
                  )}
                  {version === 'viewer' &&
                    !isDashboardPublic &&
                    keenAnalysis.masterKey() &&
                    type !== 'paragraph' &&
                    type !== 'image' && (
                      <ExplorerButton savedQuery={savedQuery} />
                    )}
                  {this.props.charts_theme &&
                    this.props.charts_theme[index] &&
                    this.props.charts_theme[index].style && (
                      <style
                        dangerouslySetInnerHTML={{
                          __html: `${this.props.charts_theme[index].style}`
                        }}
                      />
                    )}
                </div>
              );
            }
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      data,
      rows,
      settings: { palette, colors, picker, charts_theme },
      theme
    },
    dashboardInfo,
    grid,
    draggedType,
    isMoving,
    isResizing,
    settingsVisible,
    screenSize,
    isCollision
  } = state.app;
  return {
    id,
    data,
    rows,
    dashboardInfo,
    grid,
    draggedType,
    palette,
    colors,
    picker,
    theme,
    isMoving,
    isResizing,
    settingsVisible,
    screenSize,
    isCollision,
    charts_theme
  };
};

const mapDispatchToProps = {
  moveChart,
  colMoveChart,
  dropHandler,
  stopMoveChart,
  showSettings,
  mapOldItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorDashboard);
