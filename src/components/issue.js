import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import tinycolor from 'tinycolor2';

export class Issue extends Component {
  componentWillMount() {
    const { getIssue, params } = this.props;
    getIssue(params.issueId);
  }

  render() {
    const { repo, issue, isLoading } = this.props;
    const { title, labels, number, user, body, comments } = issue;
    console.log('isssue', this.props.issue)
    const { login, avatar_url } = user;
    console.log('LOAD STATE', isLoading)
    return (
      <div className="Issue--root">
        <div className="mask"></div>
        {!issue.title ?
          <div className="loader-wrap">
            <div className="loader"></div>
          </div>
          :
          <div>
            <h1>
              {repo.name}
              {` / `}
              <Link to="/">
                <i className="material-icons info-icon">info_outline</i>
                {` issues `}
              </Link> 
              {`/ `}
              <span className="number">#{number}</span>
            </h1>
            <div className="issue">
              <div className="title lg">{title}</div>
              <div className="labels">
                {labels.map((label) => {
                  const { color, name } = label;
                  const isLight = tinycolor(`#${color}`).isLight();

                  return (
                    <div
                      key={name} 
                      style={{ backgroundColor: `#${color }` }}
                      className={isLight ? 'light' : null}
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
              <div className="body-wrap">
                <div>
                  <img className="gravatar" src={avatar_url} alt="gravatar" />
                </div>
                <div>
                  <div className="bold">#{number} - <span className="link">@{login}</span></div>
                  <div className="summary">
                    {body}
                  </div>
                </div>
              </div>
            </div>

            { comments.lengt ? <h3>Comments</h3> : null }
            {comments.map((comment) => {
              return (
                <div className="issue comment">
                  {comment.body}
                  <img className="gravatar" src={comment.user.avatar_url} alt="gravatar" />
                </div>
              );
            })}

          </div>
        }
      </div>
    );
  }
}

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
};

