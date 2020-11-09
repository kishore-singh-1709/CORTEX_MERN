import React from 'react';
import TableComponent from './common/table'

const TicketTable = (props) => {
    const { onDelete, tickets:data, onSort, tableHeaders, sortColumn} = props;
    return ( 
            <TableComponent tableHeaders={tableHeaders} sortColumn={sortColumn} 
                onSort={onSort} data={data} onDelete={onDelete}/>
     );
}
 
export default TicketTable;