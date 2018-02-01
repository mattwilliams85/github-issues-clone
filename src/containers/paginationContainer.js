import { connect } from 'react-redux';
import { Pagination } from '../components/pagination';
import { fetchIssues } from '../redux/actions/issues';

export function mapStateToProps(state) {
  return {
    page: state.issues.page,
    repo: state.issues.repo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (page) => dispatch(fetchIssues(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
