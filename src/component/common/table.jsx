import React from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from '../common/tableHeader';
import TableBody from '../common/tableBody';

const TableComponent = (props) => {
    const {tableHeaders, data, sortColumn, onSort, onLike, onDelete} = props;
    return ( 
        //BootStrap Table
        <Table striped bordered hover variant="light" borderless='true'>
            <TableHeader tableHeaders={tableHeaders} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody tableHeaders={tableHeaders} data={data} onLike={onLike} onDelete={onDelete}/>
        </Table>
     );
}
 
export default TableComponent;