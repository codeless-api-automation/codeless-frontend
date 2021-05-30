import React from 'react';
import { Link, useHistory } from "react-router-dom";

import {
  usersResource
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [marketingAgreered, setMarketingAgreered] = React.useState(null);

  const [error, setError] = React.useState(null);

  const signUp = event => {
    event.preventDefault();

    let userRegistration = {
      firstName,
      lastName,
      email,
      password,
      marketingAgreered
    }

    usersResource.createUser(userRegistration)
      .then(() => {
        let signInFormDetail = {
          email: userRegistration.email,
          password: userRegistration.password
        };
        history.push('sign-in', signInFormDetail);
      }).catch(error => {
        console.log(error.response);
        if (error.response.status === 400 && error.response.data?.errors) {
          setError(error.response.data?.errors[0].defaultMessage);
          return;
        }

        if (error.response.status === 400 && error.response.data?.message) {
          setError(error.response.data?.message);
          return;
        }
        setError("Oops, Something went wrong. Please try again later.")
      });;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={signUp} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  onChange={(event) => setMarketingAgreered(event.target.checked)}
                />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>

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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}