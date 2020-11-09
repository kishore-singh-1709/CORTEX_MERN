import React,{useCallback, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './common/copyright';
import { saveUser } from '../services/userService';
import { Snackbar } from '@material-ui/core';
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

export default function SignUp(props) {
  const classes = useStyles();

  const [name, setName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [isAdmin, setisAdmin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Please Try Again');

  useEffect(()=>{
    if(isValidLogin()) window.location = '/not-found';//Hard Route Check - restricts invalid incoming routes
  },[])

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeName = useCallback(event => {
    setName(event.target.value);
  }, []);

  const onChangeCheckBox = useCallback(event => {
    setisAdmin(event.target.checked);
  }, []);

  const onChangeEmail = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const onChangePassword = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const signUpLogic = async (e) => {
    e.preventDefault();
    const insertData = {name,email,password,isAdmin};
    await saveUser(insertData)
    .then(response => {
      console.log('signup',response.header);
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

  const onSignUpClick = useCallback(signUpLogic, [name, email, password, isAdmin]);

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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldElement onChange={onChangeName} type={'text'} name={'firstName'} label={'First Name'}/>
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement onChange={onChangeEmail} type={'email'} name={'email'} label={'Email Address'}/>
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement onChange={onChangePassword} type={'password'} name={'password'} label={'password'}/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onChange={onChangeCheckBox} />}
                label="Register Me as an Admin User"
              />
            </Grid>
          </Grid>
          <ButtonElement label={'Sign Up'} onClick={onSignUpClick} className={classes.submit}/>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={errorMsg}
      />
      <Box mt={5}>
        <Copyright />
      </Box>
      </Grid>
    </Grid>
    <ToastContainer position="bottom-center" autoClose={2000}/>
    </>
  );
}