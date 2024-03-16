import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'red'
  },
  icon: {
    marginRight: theme.spacing(0.25),
  },
}));

const ErrorCircleText = ({ text, variant }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ErrorOutlineIcon fontSize='small' className={classes.icon} />
      <Typography variant={variant ? variant : "body2"}>{text}</Typography>
    </div>
  );
};

export default ErrorCircleText;
