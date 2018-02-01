import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from '../AppContainer';
import HomeContainer from '../containers/homeContainer';
import IssueContainer from '../containers/issueContainer';

export default () =>
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path="/issues/:issueId" component={IssueContainer} />
    </Route>
  </Router>;
