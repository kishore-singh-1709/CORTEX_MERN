import React,{useCallback, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './common/copyright';
import { Snackbar } from '@material-ui/core';
import {validateUser} from '../services/userService';
import { ToastContainer } from 'react-toastify';
import TextFieldElement from './common/textField';
import ButtonElement from './common/buttonElement';
import { isValidLogin } from './../services/authService';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i1.wp.com/noahkaydesign.com/wp-content/uploads/2020/04/Asset-5@2x.png?fit=2000%2C2000&ssl=1)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('User not found! Please check your credentials!');

  useEffect(()=>{
    if(isValidLogin()) window.location = '/not-found';//Hard Route Check - restricts invalid incoming routes
  },[])

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeEmail = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const onChangePassword = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const signInLogic = async (e) => {
    e.preventDefault();
    await validateUser({email,password})
      .then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        props.history.replace('/tickets');
        window.location = '/tickets'; //App full reload
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          setErrorMsg(error.response.data);
          setOpen(true);
        }
      });
    }

  const onSignInClick = useCallback(signInLogic, [email, password]);

   return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextFieldElement onChange={onChangeEmail} type={'email'} name={'email'} label={'Email Address'}/>
            <TextFieldElement onChange={onChangePassword} type={'password'} name={'password'} label={'password'}/>
            <ButtonElement label={'Sign In'} onClick={onSignInClick} className={classes.submit}/>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={errorMsg}
      />
      </Grid>
    </Grid>
    <ToastContainer position="bottom-center" autoClose={2000}/>
    </>
  );
}