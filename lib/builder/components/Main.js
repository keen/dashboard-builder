import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadLocalStorage } from '../../actions/rootActions';
import MainContainer from "../../viewer/components/MainContainer";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadLocalStorage();
  }

  render() {
    return (
      <MainContainer version="editor" />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadLocalStorage: () => dispatch(loadLocalStorage())
})

export default connect(null, mapDispatchToProps)(Main);
