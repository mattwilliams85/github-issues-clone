import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import tinycolor from 'tinycolor2';


export class Issue extends Component {
  componentWillMount() {
    const { getIssue, params } = this.props;
    getIssue(params.issueId);
  }

  render() {
    const { repo, isLoading, issue } = this.props;
    const { title, labels, number, user, body, comments } = issue;
    const { login, avatar_url } = user;

    return (
      <div className="Issue--root">
        <div className="mask"></div>
        {isLoading ?
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
                    <div key={name} style={{ backgroundColor: `#${color}` }} className={isLight ? 'light' : null}>
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
                    <div dangerouslySetInnerHTML={{ __html: marked(body) }} />
                  </div>
                </div>
              </div>
            </div>
            {comments.length ? <h3>Comments</h3> : null}
            {comments.map((comment, index) => {
              return (
                <div key={index} className="issue comment">
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
  params: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

