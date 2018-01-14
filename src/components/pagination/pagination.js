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
          <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
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

    // if(props.totalPages > 6) {
    //   if(props.currentPage - 5 > 2 && props.currentPage + 5 < props.totalPages - 2) {
    //     paginationSizeArray.splice(5, props.currentPage + 5);
    //     return(
    //       <div className="pagination">
    //         <ul>
    //           <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //           <li className="rest">
    //             <ul>
    //               <li className={props.currentPage === 1 ? 'active' : ''}><a onClick={() => props.setPage(1)}>1</a></li>
    //               <li><span>...</span></li>
    //               {paginationSizeArray.map((page, idx) => {
    //                 return(
    //                   <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                     <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                 );
    //               })}
    //               <li><span>...</span></li>
    //               <li className={props.totalPages === props.currentPage ? 'active' : ''}><a  onClick={() => props.setPage(props.totalPages)}>{props.totalPages}</a></li>
    //             </ul>
    //           </li>
    //           <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //         </ul>
    //       </div>
    //     );
    //   } else if(props.currentPage + 5 <= props.totalPages) {
    //     paginationSizeArray.splice(5, props.currentPage + 5);
    //     return(
    //       <div className="pagination">
    //         <ul>
    //           <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //           <li className="rest">
    //             <ul>
    //               {paginationSizeArray.map((page, idx) => {
    //                 return(
    //                   <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                     <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                 );
    //               })}
    //               <li><span>...</span></li>
    //               <li className={props.totalPages === props.currentPage ? 'active' : ''}><a  onClick={() => props.setPage(props.totalPages)}>{props.totalPages}</a></li>
    //             </ul>
    //           </li>
    //           <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //         </ul>
    //       </div>
    //     );
    //   } else if(props.currentPage <= 5) {
    //     paginationSizeArray.splice(5, props.totalPages.length - 5);
    //     return(
    //       <div className="pagination">
    //         <ul>
    //           <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //           <li className="rest">
    //             <ul>
    //               <li className={props.currentPage === 1 ? 'active' : ''}><a onClick={() => props.setPage(1)}>1</a></li>
    //               <li><span>...</span></li>
    //               {paginationSizeArray.map((page, idx) => {
    //                 return(
    //                   <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                     <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                 );
    //               })}
    //             </ul>
    //           </li>
    //           <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //         </ul>
    //       </div>
    //     );
    //   } else {
    //     return(
    //       <div className="pagination">
    //         <ul>
    //           <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //           <li className="rest">
    //             <ul>
    //               {paginationSizeArray.map((page, idx) => {
    //                 return(
    //                   <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                     <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                 );
    //               })}
    //             </ul>
    //           </li>
    //           <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //         </ul>
    //       </div>
    //     );
    //   }
    // } else {
    //   return(
    //     <div className="pagination">
    //       <ul>
    //         <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //         <li className="rest">
    //           <ul>
    //             {paginationSizeArray.map((page, idx) => {
    //               return(
    //                 <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                   <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //               );
    //             })}
    //           </ul>
    //         </li>
    //         <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //       </ul>
    //     </div>
    //   );
    // }

    // return(
    //   <div className="pagination">
    //     <ul>
    //       <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //       <li className="rest">
    //         <ul>
    //           {props.totalPages > 6 }
    //           {paginationSizeArray.map((page, idx) => {
    //             //if(idx+1 <= RESULTS_PER_PAGE/2-1) {
    //             if(props.currentPage <= 2) {
    //               return(
    //                 <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                   <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //               );
    //             }
    //
    //             //}
    //           })}
    //         </ul>
    //       </li>
    //       <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //     </ul>
    //   </div>
    // );
    // if(props.totalPages <= 6) {
    //   return(
    //     <div className="pagination">
    //       <ul>
    //         <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //         <li className="rest">
    //           <ul>
    //             {paginationSizeArray.map((page, idx) => {
    //               if(idx+1 <= RESULTS_PER_PAGE/2-1) {
    //                 return(
    //                   <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                     <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                 );
    //               }
    //             })}
    //           </ul>
    //         </li>
    //         <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //       </ul>
    //     </div>
    //   );
    // } else if(props.totalPages > 6 && props.currentPage < 5) {
    //   return(
    //     <div className="pagination">
    //       <ul>
    //         <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //         <li className="rest">
    //           <ul>
    //             {paginationSizeArray.map((page, idx) => {
    //               if(paginationSizeArray.length !== idx+1) {
    //                 if(idx+1 <= RESULTS_PER_PAGE/2-1) {
    //                   return(
    //                     <li
    //                       key={idx}
    //                       className={idx+1 === props.currentPage ? 'active' : ''}
    //                     ><a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                   );
    //                 }
    //               }
    //             })}
    //             <li><span>...</span></li>
    //             <li className={props.totalPages === props.currentPage ? 'active' : ''}><a  onClick={() => props.setPage(props.totalPages)}>{props.totalPages}</a></li>
    //           </ul>
    //         </li>
    //         <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //       </ul>
    //     </div>
    //   );
    // } else if(props.currentPage > props.totalPages -  4) {
    //   return(
    //     <div className="pagination">
    //       <ul>
    //         <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //         <li className="rest">
    //           <ul>
    //             <li className={props.currentPage === 1 ? 'active' : ''}><a onClick={() => props.setPage(1)}>1</a></li>
    //             <li><span>...</span></li>
    //             {paginationSizeArray.map((page, idx) => {
    //               if(idx > 0) {
    //                 if(idx+1 >= props.totalPages-4+1) {
    //                   return(
    //                     <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                       <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //                   );
    //                 }
    //               }
    //             })}
    //           </ul>
    //         </li>
    //         <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //       </ul>
    //     </div>
    //   );
    // } else {
    //   return(
    //     <div className="pagination">
    //       <ul>
    //         <li className="prev"><a onClick={() => props.setPage(props.currentPage > 0 ? props.currentPage - 1 : 0)}>Prev</a></li>
    //         <ul className="rest">
    //           <li className={props.currentPage === 1 ? 'active' : ''}><a onClick={() => props.setPage(1)}>1</a></li>
    //           <li><span>...</span></li>
    //           {paginationSizeArray.map((page, idx) => {
    //             if(
    //               idx > 0 &&
    //               paginationSizeArray.length !== idx+1 &&
    //               idx+1 <= props.currentPage + 1 &&
    //               props.currentPage - 1 <= idx+1
    //             ) {
    //               return(
    //                 <li key={idx} className={idx+1 === props.currentPage ? 'active' : ''}>
    //                   <a onClick={() => props.setPage(idx+1)}>{idx+1}</a></li>
    //               );
    //             }
    //           })}
    //           <li><span>...</span></li>
    //           <li className={props.totalPages === props.currentPage ? 'active' : ''}>
    //             <a onClick={() => props.setPage(props.totalPages)}>{props.totalPages}</a></li>
    //         </ul>
    //         <li className="next"><a onClick={() => props.setPage(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>Next</a></li>
    //       </ul>
    //     </div>
    //   );
    //}
  };

  return renderPagination();
};

export default Pagination;