import React from 'react';

const ProgressBar = ({progress}) => {
    return ( 
        <div className="progress">
            <div name='progressBar' className="progress-bar" role="progressbar" style={{width:progress }}>{progress}</div>
        </div>
     );
}
 
export default ProgressBar;