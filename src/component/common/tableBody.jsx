import React from 'react';
import _ from 'lodash';


const createKey = (item,header) => {
    return item._id + header.column;
}

const renderCellContent = (item,header) => {
    if(header.content) return header.content(item);

    return _.get(item,header.column);
}

const TableBody = (props) => {
    const {tableHeaders, data} = props;
    return ( 
        <tbody> 
            {data.map(item =>
                <tr key={item._id}>{tableHeaders.map(header =>
                    <td key={createKey(item,header)}>{renderCellContent(item,header)}</td>)}
                </tr>
            )}
        </tbody>
     );
}
 
export default TableBody;