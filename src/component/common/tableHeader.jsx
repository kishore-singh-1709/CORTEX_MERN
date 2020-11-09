import React, { Component } from 'react';

class TableHeader extends Component {
    
    render() { 
        const { tableHeaders} = this.props;
        return ( 
            <thead>
                <tr> {tableHeaders.map(h=>
                    <th style={{cursor:'pointer'}} key={h.column} 
                    onClick={()=>this.raiseSort(h)}>{h.name} {this.renderSortIcon(h)}
                    </th>)}
                </tr>
            </thead>
         );
    }

    raiseSort=(header)=>{
        const tableHeaders = [...this.props.tableHeaders];
        const sortColumn = tableHeaders.filter(c => c.column===header.column)[0];
        sortColumn.order = (sortColumn.order === 'asc') ? 'desc':'asc';
        this.props.onSort(sortColumn);
    }

    renderSortIcon = (header) => {
        const { sortColumn } = this.props;
        if(header.column !== sortColumn.column) return null;

        let classes = 'fa fa-sort';
        classes += (sortColumn.order === 'asc') ? '-desc':'-asc';
        return <i className={classes} aria-hidden="true"></i>;
    }
}
 
export default TableHeader;