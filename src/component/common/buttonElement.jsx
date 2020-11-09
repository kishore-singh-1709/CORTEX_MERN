import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonElement = ({ label, onClick, className }) => {
      
    return ( 

        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={className}
              onClick={onClick}
            >
              {label}
            </Button>
     );
}
 
export default ButtonElement;