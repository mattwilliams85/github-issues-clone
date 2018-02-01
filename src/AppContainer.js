import React, { Component, PropTypes } from 'react';
import HomeContainer from './containers/homeContainer';
import { connect } from 'react-redux';
import { fetchIssues, fetchRepo } from './redux/actions/issues';

class AppContainer extends Component {
  componentWillMount() {
    this.props.fetchRepo();
    this.props.fetchIssues();
  }

  render() {
    return (
      <div className="AppContainer--root">
        {this.props.children}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    repo: state.issues.repo,
    issues: state.issues.entities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepo: () => dispatch(fetchRepo()),
    fetchIssues: () => dispatch(fetchIssues())
  };
}

AppContainer.propTypes = {
  fetchIssues: PropTypes.func.isRequired,
  fetchRepo: PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
