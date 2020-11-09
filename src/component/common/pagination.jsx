import React from 'react';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage}) => {
    
    const totalPage = itemsCount/pageSize;

    return ( 
        totalPage > 1 ? 
            (<nav aria-label="Page navigation example">
                <ul className="pagination">
                {_.range(1,(totalPage+1)).map( page => 
                    <li key={page} style={{cursor:'pointer'}} className={currentPage===page?"page-item active":"page-item"}>
                        <a className="page-link" onClick={()=>onPageChange(page)}>{page}
                        </a>
                    </li> )}
                </ul>
            </nav>) : ''
     );
};
 
export default Pagination;
