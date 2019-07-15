import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeDashboardTitle,
  toogleDashboardsMenu,
  setNewDashboardForFocus
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
    if (this.props.version === "editor") {
      if (this.props.id === this.props.newDashboardId) {
        this.handleFocus();
        this.props.setNewDashboardForFocus(false);
      }
    }
  }

  componentDidUpdate() {
    if (this.props.version === "editor") {
      if (this.props.id === this.props.newDashboardId) {
        this.handleFocus();
        this.props.setNewDashboardForFocus(false);
      }
    }
  }

  handleFocus = () => {
    this.title.current.focus();
    this.title.current.select();
  };

  render() {
    const { version, title, dashboardsMenu } = this.props;
    return (
      <React.Fragment>
        {version === "editor" ? (
          <React.Fragment>
            <div className="burger-icon">
              <FontAwesomeIcon
                icon="bars"
                onClick={this.props.toogleDashboardsMenu}
              />
              {dashboardsMenu && <EditorDashboardsSwitch />}
            </div>
            <input
              ref={this.title}
              type="text"
              value={title}
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
    dashboardInfo: { id, title },
    dashboardsMenu,
    newDashboardId
  } = state;
  return {
    id,
    title,
    dashboardsMenu,
    newDashboardId
  };
};

const mapDispatchToProps = dispatch => ({
  changeDashboardTitle: title => dispatch(changeDashboardTitle(title)),
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTopToolbarTitle);