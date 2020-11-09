import { toast } from 'react-toastify';

export function handleToastInfo({action,msg}) {
    switch(action){
        case 'info': toast.info(msg); break;
        case 'warn': toast.warn(msg); break;
        case 'error': toast.error(msg); break;
        case 'success': toast.success(msg); break;
        case 'dark': toast.dark(msg); break;
        default: toast.info(msg);
    }
  }