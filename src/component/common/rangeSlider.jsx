import React from 'react';

const RangeSlider = ({progress, onChange}) => {
    
    const progressValue = progress.slice(0, -1);
    return ( 
        <>
            <label htmlFor='myRange'>Progress</label>
            <div className="slidecontainer">
                <input type="range" min="0" max="100" step="10" value={progressValue} className="slider" id="myRange" onChange={(e)=>onChange(e)} />
                <span className='btn btn-badge-primary'>{progress}</span>
            </div>
        </>
     );
}
 
export default RangeSlider;