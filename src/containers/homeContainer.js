import { connect } from 'react-redux';
import Home from '../components/home';

export function mapStateToProps(state) {
  return {
    repo: state.issues.repo,
    issues: state.issues.entities,
    isLoading: state.issues.isLoading
  };
}

export default connect(mapStateToProps)(Home);
