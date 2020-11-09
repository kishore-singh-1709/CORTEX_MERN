import React from 'react';

const Input = ({ type, name, label, value, placeholder, error, onChange }) => {
    return ( 
                <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input 
                    type={type} 
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} 
                    id={name} 
                    className="form-control"/>
                    {error && <div className='alert alert-danger'>{error}</div>}
                </div>
     );
}
 
export default Input;