import React from 'react';

const StatusList = (props) => {
    const { status, onStatusSelect, selectedStatus } = props;
    
    return ( 
        <ul className="list-group">
            {status.map(s => 
            <li key={s._id} style={{cursor:'pointer'}} className={getActiveStatusClass(selectedStatus,s.name)}
             onClick={()=>onStatusSelect(s)} >{s.name}
            </li> )} 
        </ul>
     );
}

//In SFC, function must be placed outside => So It doesn't gets re-defined everytime or useMemo/useCallBack Hook
function getActiveStatusClass(selectedStatus,statusName) {
    let classes = "list-group-item";
    return classes += (selectedStatus && selectedStatus.name===statusName) ? 
    ' active' : (statusName==='all' ? ' active':'');
} 

export default StatusList;