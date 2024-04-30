import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import * as common from "constants/Common";

import {
  authResource
} from '../service/CodelessApi.js';

import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Container,
  Box,
  Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';

import Copyright from 'components/Copyright/Copyright'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rememberMe, setRememberMe] = React.useState(null);

  const [error, setError] = React.useState(null);

  const signIn = event => {
    event.preventDefault();

    let userLogIn = {
      email,
      password,
      rememberMe
    }

    authResource.logIn(userLogIn)
      .then(response => {
        let xAuthToken = response.headers[common.ACCESS_TOKEN_HEADER];
        if (xAuthToken) {
          localStorage.setItem(common.ACCESS_TOKEN, xAuthToken);
          history.push('/');
        }
      }).catch(error => {
        console.log(error);
        if (error.response?.status === 401) {
          setError("The email or password is incorrect.");
          return;
        }
        setError("Oops, something went wrong. Please try again later.")
      });;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get(common.ACCESS_TOKEN);
    if (token) {
      localStorage.setItem(common.ACCESS_TOKEN, token);
      history.push('/');
    }
  }, [history, location.search]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={signIn} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox
              value="remember"
              color="primary"
              onChange={(event) => setRememberMe(event.target.checked)} />}
            label="Remember me"
          />

          <Grid container>
            {error !== null &&
              <Grid item xs={12}>
                <Alert onClose={() => setError(null)} variant="filled" severity="error">
                  {error}
                </Alert>
              </Grid>
            }
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}