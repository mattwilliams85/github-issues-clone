import 'whatwg-fetch';
import * as type from './types';

export const loadStart = () => {
  return {
    type: type.LOADING_START
  };
};

export const getIssueSuccess = (json) => {
  return {
    type: type.GET_ISSUE_SUCCEEDED,
    payload: json
  };
};

export const fetchIssuesSuccess = (json) => {
  return {
    type: type.FETCH_ISSUES_SUCCEEDED,
    payload: json
  };
};

export const fetchRepoSuccess = (json) => {
  return {
    type: type.FETCH_REPO_SUCCEEDED,
    payload: json
  };
};

export const changePage = (page) => {
  return {
    type: type.SET_PAGE,
    payload: page
  };
}

export const getComments = (issue) => {
  const url = issue.comments_url;
  
  return (dispatch) => {
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        issue.comments = json
        dispatch(getIssueSuccess(issue));
      }).catch(() => {
        Error('Fetch issue failed!');
      });
  };
};

export const getIssue = (id) => {
  const url = `https://api.github.com/repos/nodejs/node/issues/${id}`;
 
  return (dispatch) => {
    dispatch(loadStart());
    
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        dispatch(getComments(json));
      }).catch(() => {
        Error('Fetch issue failed!');
      });
  }
}

export const fetchRepo = () => {
  const url = 'https://api.github.com/repos/nodejs/node';

  return (dispatch) => {
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        dispatch(fetchRepoSuccess(json));
      }).catch(() => {
        Error('Fetch repo failed!');
      });
  }
}

export const fetchIssues = (page = 1) => {
  const url = `https://api.github.com/repos/nodejs/node/issues?page=${page}`;

  return (dispatch) => {
    dispatch(loadStart());
    dispatch(changePage(page));

    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        dispatch(fetchIssuesSuccess(json));
      }).catch(() => {
        Error('Fetch issues failed!');
      });
  }
}