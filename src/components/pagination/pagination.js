import React from 'react';
import { checkMediaQuery } from '../../util/mediaQuery';
import './pagination.css';

export const Pagination = (props) => {
  const renderPagination = () => {
    let paginationSizeArray = [],
      pageSize = 5,
      startPage,
      partialNav = 'none',
      endPage;

    if(props.totalPages <= pageSize) {
      startPage = 1;
      endPage = props.totalPages;
    } else {
      if(props.currentPage <= 3) {
        startPage = 1;
        endPage = pageSize - 1;
        partialNav = 'right';
      } else if(props.currentPage + 2 >= props.totalPages) {
        startPage = props.totalPages - 3;
        endPage = props.totalPages;
        partialNav = 'left';
      } else {
        startPage = props.currentPage - 1;
        endPage = props.currentPage + 1;
        partialNav = 'both';
      }
    }


    for(let i = 0; i < endPage+1 - startPage; i++) {
      if(i === 0) {
        paginationSizeArray.push(startPage);
      } else {
        paginationSizeArray.push(startPage+i);
      }
    }

    return(
      <div className="pagination">
        <ul>
          <li className="prev"><a onClick={() => props.setPage(props.currentPage > 1 ? props.currentPage - 1 : 1)}>Prev</a></li>
          {(partialNav === 'left' || partialNav === 'both') && checkMediaQuery(768) &&  (
            <ul className="partial">
              <li className={props.currentPage === 1 ? 'active' : ''}><a onClick={() => props.setPage(1)}>1</a></li>
              <li><span>...</span></li>
            </ul>
          )}
          <li className="rest">
            <ul>
              {paginationSizeArray.map((page, idx) => {
                return(
                  <li key={idx} className={page === props.currentPage ? 'active' : ''}>
                    <a onClick={() => props.setPage(page)}>{page}</a></li>
                );
              })}
            </ul>
          </li>
          {(partialNav === 'right' || partialNav === 'both') && checkMediaQuery(768) &&  (
            <ul className="partial">
              <li><span>...</span></li>
              <li className={props.totalPages === props.currentPage ? 'active' : ''}><a  onClick={() => props.setPage(props.totalPages)}>{props.totalPages}</a></li>
            </ul>
          )}
          <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
        </ul>
      </div>
    );
  };

  return renderPagination();
};

export default Pagination;