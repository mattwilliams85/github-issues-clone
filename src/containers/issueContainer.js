import { connect } from 'react-redux';
import { Issue } from '../components/issue';
import { getIssue } from '../redux/actions/issues';

export function mapStateToProps(state) {
  return {
    issue: state.issues.issue,
    repo: state.issues.repo,
    isLoading: state.issues.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getIssue: (id) => dispatch(getIssue(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Issue);

