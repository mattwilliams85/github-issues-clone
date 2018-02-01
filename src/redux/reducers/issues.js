import * as type from '../actions/types';

const initialState = {
  entities: [],
  issue: { user: {}, labels: [], comments: [] },
  repo: {},
  page: 1,
  isLoading: false
};

export function issues(state = initialState, action) {
  switch (action.type) {
    case type.SET_PAGE:
      return { ...state, page: action.payload };
    case type.FETCH_ISSUES_SUCCEEDED:
      return { ...state, entities: action.payload, isLoading: false };
    case type.GET_ISSUE_SUCCEEDED:
      return { ...state, issue: action.payload, isLoading: false };
    case type.FETCH_REPO_SUCCEEDED:
      return { ...state, repo: action.payload };
    case type.LOADING_START:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}