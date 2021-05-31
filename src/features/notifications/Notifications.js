import React from 'react';
import { connect } from 'react-redux';

import {
  setNotificationMessage
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

function Notification({ notificationMessage, setNotificationMessage }) {
  const classes = useStyles();

  const handleOnClose = () => {
    setNotificationMessage(null);
  }

  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
  const autoHideDuration = 5000;

  console.log(notificationMessage)

  const isOpen = (notificationMessage) => {
    return notificationMessage === null || notificationMessage === undefined ? false : true;
  }

  return (
    <div className={classes.root}>
      {isOpen(notificationMessage) && <Snackbar
        anchorOrigin={anchorOrigin}
        open={isOpen(notificationMessage)}
        autoHideDuration={autoHideDuration}
        onClose={handleOnClose}>
        <Alert
          severity={notificationMessage?.severity}
          onClose={handleOnClose}>{notificationMessage?.message}</Alert>
      </Snackbar>}
    </div>
  );
}

const mapStateToProps = state => ({
  notificationMessage: state.utilEvents.notificationMessage
});
export default connect(mapStateToProps, { setNotificationMessage })(Notification);