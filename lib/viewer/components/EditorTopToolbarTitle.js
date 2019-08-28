import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeDashboardTitle,
  toggleDashboardsMenu,
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

  handleClick = () => {
    this.props.toggleDashboardsMenu("dashboard");
  };

  renderSwitcher() {
    const { title, switcherEnabled } = this.props;
    return switcherEnabled ? (
      <SwitchDashboard />
    ) : (
      <h1 className="title">{title}</h1>
    );
  }

  render() {
    const { id, version, title, dashboardsMenu, editable } = this.props;
    return (
      <React.Fragment>
        {version === "editor" ? (
          <React.Fragment>
            <div className="burger-icon">
              <FontAwesomeIcon icon="bars" size="lg" onClick={this.handleClick} />
              {dashboardsMenu === "dashboard" && <EditorDashboardsSwitch />}
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
          <React.Fragment>
            {this.renderSwitcher()}
            {editable && (
              <div className="edit-dashboard-button">
                <Link
                  to={`/editor/${id}`}
                  className="edit-dashboard-button__link"
                >
                  <FontAwesomeIcon icon="edit" size="sm" /> Edit
                </Link>
              </div>
            )}
          </React.Fragment>
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

const mapDispatchToProps = {
  changeDashboardTitle,
  toggleDashboardsMenu,
  setNewDashboardForFocus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTopToolbarTitle);

EditorTopToolbarTitle.defaultProps = {
  switcherEnabled: true,
  editable: true
};
