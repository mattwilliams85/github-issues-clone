import React, { PropTypes } from 'react';

export const Pagination = ({ repo, page, handleClick }) => {
  const pageTotal = Math.floor(repo.open_issues_count / 30);
  return (
    <div className="Pagination--root">
      {page > 1 ?
        <div className="button" onClick={handleClick.bind(this, page - 1)}>
          <i className="material-icons">chevron_left</i>
          PREV
        </div>
        : <div className="hidden-button"></div>}
      {pageTotal ? <div>Page {page} of {pageTotal}</div> : null}
      {page !== pageTotal ?
        <div className="button" onClick={handleClick.bind(this, page + 1)}>
          NEXT
          <i className="material-icons">chevron_right</i>
        </div>
        : <div className="hidden-button"></div>}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  repo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};
