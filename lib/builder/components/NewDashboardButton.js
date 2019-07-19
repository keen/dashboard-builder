import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addDashboardItem,
  toogleDashboardsMenu,
  setNewDashboardForFocus,
  clearAccessKey
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NewDashboardButton extends React.Component {
  constructor(props){
    super(props);
  }

  addDashboard = () => {
    this.props.addDashboardItem();
  };

  componentDidUpdate(){console.log(this.props.id, this.props.newDashboardId)
    if (this.props.id === this.props.newDashboardId) {
      this.props.history.push(`/editor/${this.props.id}`);
      this.props.setNewDashboardForFocus(this.props.id);
      this.props.dashboardsMenu && this.props.toogleDashboardsMenu();
      this.props.clearAccessKey();
    }
  }

  render() {
    return (
      <div className="new-dashboard-button" onClick={this.addDashboard}>
        <FontAwesomeIcon icon="plus-circle" /> New dashboard
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { id },
    dashboardsMenu,
    newDashboardId
  } = state;
  return {
    id,
    dashboardsMenu,
    newDashboardId
  };
};

const mapDispatchToProps = dispatch => ({
  addDashboardItem: element => dispatch(addDashboardItem(element)),
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value)),
  clearAccessKey: () => dispatch(clearAccessKey())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewDashboardButton)
);
