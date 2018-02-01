import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import PaginationContainer from '../containers/paginationContainer';
import tinycolor from 'tinycolor2';

export default class Home extends Component {
  characterLimit(n, string) {
    return string.length > n 
      ? `${string.substring(0, n).trim()}...`
      : string;
  }

  render() {
    const { repo, issues } = this.props;
    const { characterLimit } = this;

    return (
      <div className="Home--root">
        <div className="mask"></div>
        {!issues.length ?
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
            </h1>
            
            <PaginationContainer />

            <div className="issue-wrap">
            {issues.map((issue) => {
              const { title, labels, number, user, body } = issue;
              const { login, avatar_url } = user;

              return (
                <div key={number} className="issue">
                  <Link to={`/issues/${number}`}><div className="title">{title}</div></Link>
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
                        {characterLimit(144, body)}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
            </div>
            <PaginationContainer />
          </div>
          }
      </div>
    );
  }
}

Home.propTypes = {
  repo: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
};
