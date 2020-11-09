import React from 'react';
import TextField from '@material-ui/core/TextField';
 
const TextFieldElement = ({ onChange, name, label, type, errors }) => {
    
    return ( 
    <>
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={name}
        label={label}
        id={name}
        type={type}
        autoComplete={name==='password' ? "current-password" : "email"}
        onChange={onChange}
      /> 
      {errors && <div className='alert alert-danger'>{errors}</div>}
      </>
      );
}
 
export default TextFieldElement;