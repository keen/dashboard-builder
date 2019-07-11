import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeDashboardTitle,
  toogleDashboardsMenu,
  setNewDashboardForFocus,
} from "../../actions/rootActions";
import SwitchDashboard from "./SwitchDashboard";
import EditorDashboardsSwitch from "../../builder/components/EditorDashboardsSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditorTopToolbarTitle extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
  }

  componentDidMount() {
    if(this.props.version === 'editor'){
      if(this.props.id === this.props.newDashboardId){
        this.handleFocus();
        this.props.setNewDashboardForFocus(false)
      }
    }
  }

  componentDidUpdate(){
    if(this.props.version === 'editor'){
    if(this.props.id === this.props.newDashboardId){
      this.handleFocus();
      this.props.setNewDashboardForFocus(false)
    }}
  }

  handleFocus = () => {
    this.title.current.focus();
    this.title.current.select();
  };

  handleClick = () => {
    console.log('click');
    this.props.toogleDashboardsMenu('dashboard');
  }

  render() {
    const { version, dashboardTitle, dashboardsMenu } = this.props;
    return (
      <React.Fragment>
        {version === "editor" ? (
          <React.Fragment>
            <div className="burger-icon">
              <FontAwesomeIcon
                icon="bars"
                onClick={this.handleClick}
              />
              {dashboardsMenu === 'dashboard' && <EditorDashboardsSwitch />}
            </div>
            <input
              ref={this.title}
              type="text"
              value={dashboardTitle}
              onChange={e => this.props.changeDashboardTitle(e.target.value)}
              placeholder="Enter your dashboard title..."
            />
          </React.Fragment>
        ) : (
          <SwitchDashboard />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardTitle },
    dashboardsMenu,
    newDashboardId
  } = state;
  return {
    id,
    dashboardTitle,
    dashboardsMenu,
    newDashboardId
  };
};

const mapDispatchToProps = dispatch => ({
  changeDashboardTitle: title => dispatch(changeDashboardTitle(title)),
  toogleDashboardsMenu: (value) => dispatch(toogleDashboardsMenu(value)),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTopToolbarTitle);
