import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    
    return ( 
        <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <select
                    id={name}
                    {...rest}
                    // value,onChange params =>rest
                    name={name} 
                    className="form-control">

                    <option value=''></option>
                    {options.map(o => 
                        <option key={o._id} value={o._id}>{o.name}</option>
                    )}
                    </select>
                    {error && <div className='alert alert-danger'>{error}</div>} 
        </div>
     );
}
 
export default Select;