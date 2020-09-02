import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash'

import {
  isCallSuccessful,
  isCallFailed
} from '../../store/http-call-action';

import {
  setErrorMessage
} from "../../store/util-action.js"

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

function Notification({ httpCallResult, utilEvents,
  isCallFailed, isCallSuccessful,
  setErrorMessage }) {
  const classes = useStyles();

  const handleOnSuccessClose = () => {
    isCallSuccessful(false);
  }

  const handleOnErrorClose = () => {
    isCallFailed(false);
    setErrorMessage(null);
  }

  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
  const autoHideDuration = 6000;
  const isOpeningNeededByHttpCallResult = !_.isEmpty(httpCallResult.message);
  const isErrorAlertOpeningNeeded = !_.isEmpty(utilEvents.errorMessage);
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={httpCallResult.isCallSuccessful && isOpeningNeededByHttpCallResult}
        autoHideDuration={autoHideDuration}
        onClose={handleOnSuccessClose}>
        <Alert
          severity="success"
          onClose={handleOnSuccessClose}>{httpCallResult.message}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={(httpCallResult.isCallFailed && isOpeningNeededByHttpCallResult) || isErrorAlertOpeningNeeded}
        autoHideDuration={autoHideDuration}
        onClose={handleOnErrorClose}>
        <Alert
          severity="error"
          onClose={handleOnErrorClose}>{isErrorAlertOpeningNeeded ? utilEvents.errorMessage : httpCallResult.message}</Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = state => ({
  httpCallResult: state.httpCallResult,
  utilEvents: state.utilEvents
});
export default connect(mapStateToProps, { isCallFailed, isCallSuccessful, setErrorMessage })(Notification);