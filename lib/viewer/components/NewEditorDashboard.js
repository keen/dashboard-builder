import React, { PureComponent } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from 'react-redux';
// import _ from "lodash";
import isEqual from 'lodash/isEqual';
import { client } from 'Client/index';
import {
  dropHandler,
  moveChart,
  stopMoveChart,
  showSettings,
  mapOldItems,
  colMoveChart,
  setLayout,
} from '../../actions/rootActions';
import Paragraph from '../../builder/components/Paragraph';
import Image from '../../builder/components/Image';
import ChartContainer from '../../builder/components/ChartContainer';
import Buttons from '../../builder/components/Buttons';
import ExplorerButton from './ExplorerButton';
import Chart from '../../builder/components/Chart';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class NewEditorDashboard extends PureComponent {
  constructor(props) {
    super(props);
    console.log('--- constructor ---', props);
    this.state = {
      items: [],
      newCounter: 0,
      layout: [],
      // type: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.layout, prevProps.layout)) {
      console.log('--- component did update ---', this.props.layout, this.props.items);
      const { layout, items } = this.props;
      this.setState({
        layout: layout,
        items: items,
        newCounter: items.length
      })
    }
  }

  createElement = (el) => {
    console.log('create element', el);
    const { i, type } = el;
    const { id, theme } = this.props;
    const options = (theme && theme.options) || {};
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    return (
      <div key={i} data-grid={el} id={`${id}-${i}`}>
        {type === 'image' ? (
          <Image src={src} index={index} />
        ) : type === 'paragraph' ? (
          <Paragraph text={text} index={index} />
        ) : (
          <Chart type={type} {...options} />
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={() => this.onRemoveItem(i)}
        >
          &times;
        </span>
      </div>
    )
    // const i = el.add ? "+" : el.i;
    // return (
    //   <div key={i} data-grid={el}>
    //     {el.add ? (
    //       <span
    //         className="add text"
    //         onClick={this.onAddItem}
    //         title="You can add an item by clicking here, too."
    //       >
    //         Add +
    //       </span>
    //     ) : (
    //       <span className="text">{i}</span>
    //     )}
    //     <span
    //       className="remove"
    //       style={removeStyle}
    //       onClick={this.onRemoveItem.bind(this, i)}
    //     >
    //       &times;
    //     </span>
    //   </div>
    // );
  }

  onAddItem = () => {
    console.log("adding", "n" + this.state.newCounter);
    this.setState(state => {
      return {
        ...state,
        items: [
          ...state.items,
          {
            i: "n" + state.newCounter,
            x: (state.items.length * 2) % (state.cols || 12),
            y: Infinity,
            w: 2,
            h: 2
          }
        ],
        newCounter: state.newCounter + 1
      }
    });

    // this.setState({
    //   // Add a new item. It must have a unique key!
    //   items: this.state.items.concat({
    //     i: "n" + this.state.newCounter,
    //     x: (this.state.items.length * 2) % (this.state.cols || 12),
    //     y: Infinity, // puts it at the bottom
    //     w: 2,
    //     h: 2
    //   }),
    //   // Increment the counter to ensure key is always unique.
    //   newCounter: this.state.newCounter + 1
    // });
  }

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    // this.props.onLayoutChange(layout);
    this.props.setLayout(layout, this.state.items);
    this.setState({ layout: layout });
  }

  onRemoveItem = (i) => {
    console.log("removing", i);
    // this.setState({ items: _.reject(this.state.items, { i: i }) });
    this.setState(state => {
      return {
        ...state,
        items: state.items.filter(item => item.i !== i)
      }
    })
  }

  onDrop = elemParams => {
    console.log(`Element parameters: ${JSON.stringify(elemParams)}`, this.state.newCounter);
    const { x, y, w, h } = elemParams;
    // this.props.dropHandler(this.props.draggedType);
    this.setState(state => {
      return {
        ...state,
        items: [
          ...state.items,
          {
            i: "n" + state.newCounter,
            x,
            y,
            w,
            h,
            type: this.props.draggedType,
          }
        ],
        newCounter: state.newCounter + 1,
        type: '',
      }
    })
  };

  render() {
    return (
      <div id={`dashboard-${this.props.id}`}>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => {
              e.dataTransfer.setData("text/plain", "");
              // this.setState({ type: 'chart '});
            }
          }
          style={{ width: 100, height: 100, border: '1px solid black', display: 'inline-block', margin: 5 }}
        >
          Chart
        </div>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => {
              e.dataTransfer.setData("text/plain", "");
              // this.setState({ type: 'text'});
            }
          }
          style={{ width: 100, height: 100, border: '1px solid black', display: 'inline-block', margin: 5 }}
        >
          Text
        </div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onDrop={this.onDrop}
          isDroppable
          droppingItem= {{ i: 'shadow', w: 2, h: 2 }}
          layouts={this.props.layout}
          // verticalCompact={false}
          // compactType={null}
          // preventCollision={false}
          {...this.props}
        >
          {/* {_.map(this.state.items, el => this.createElement(el))} */}
          {this.state.items.map(item => this.createElement(item))}
        </ResponsiveReactGridLayout>
        {this.props.theme && this.props.theme.style &&
          <style dangerouslySetInnerHTML={{__html: `${this.props.theme.style}`}}></style>
        }
      </div>
    );
  }
}

// export default NewEditorDashboard;

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      data,
      rows,
      settings: { palette, colors, picker, theme, layout, items },
      // theme,
    },
    dashboardInfo,
    // grid,
    draggedType,
    // isMoving,
    // isResizing,
    settingsVisible,
    screenSize,
    // isCollision
  } = state;
  return {
    id,
    data,
    rows,
    dashboardInfo,
    // grid,
    draggedType,
    palette,
    colors,
    picker,
    theme,
    layout,
    items,
    // isMoving,
    // isResizing,
    settingsVisible,
    screenSize,
    // isCollision
  };
};

const mapDispatchToProps = {
  // moveChart,
  // colMoveChart,
  dropHandler,
  // stopMoveChart,
  showSettings,
  mapOldItems,
  setLayout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEditorDashboard);

NewEditorDashboard.defaultProps = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
}