import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from 'react-router-dom';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  // number of the pages for pagination
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // no pagination if the pageSize is only 1
  if (pagesCount === 1) return null;

  // create an array to map through to create the pagination links
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <Link className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;
