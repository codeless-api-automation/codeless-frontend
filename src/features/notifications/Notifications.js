import React from 'react';
import { connect } from 'react-redux';

import {
  isCallSuccessful,
  isCallFailed
} from '../../store/http-call-action';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Notification({ httpCallResult, isCallFailed, isCallSuccessful }) {
  const classes = useStyles();

  const handleOnSuccessClose = () => {
    isCallSuccessful(false);
  }

  const handleOnErrorClose = () => {
    isCallFailed(false);
  }

  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
  const autoHideDuration = 6000;

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={httpCallResult.isCallSuccessful}
        autoHideDuration={autoHideDuration}
        onClose={handleOnSuccessClose}>
        <Alert
          severity="success"
          onClose={handleOnSuccessClose}>{httpCallResult.message}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={httpCallResult.isCallFailed}
        autoHideDuration={autoHideDuration}
        onClose={handleOnErrorClose}>
        <Alert
          severity="error"
          onClose={handleOnErrorClose}>{httpCallResult.message}</Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = state => ({
  httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, { isCallFailed, isCallSuccessful })(Notification);