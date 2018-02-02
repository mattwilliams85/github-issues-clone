import React, { PropTypes } from 'react';
import marked from 'marked';
import tinycolor from 'tinycolor2';


export const Body = ({ issue }) => {
  const { title, labels, number, user, body } = issue;
  const { login, avatar_url } = user;

  return (
    <div className="issue">
      <div className="title lg">{title}</div>
      <div className="labels">
        {labels.map((label) => {
          const { color, name } = label;
          const isLight = tinycolor(`#${color}`).isLight();

          return (
            <div
              key={name}
              style={{ backgroundColor: `#${color}` }}
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
            <div dangerouslySetInnerHTML={{ __html: marked(body) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

Body.propTypes = {
  issue: PropTypes.object.isRequired
};
