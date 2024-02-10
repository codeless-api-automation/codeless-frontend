import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'green'
  },
  icon: {
    marginRight: theme.spacing(0.25),
  },
}));

const CheckCircleText = ({ text, variant }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckCircleOutlineIcon fontSize='inherit' className={classes.icon} />
      <Typography variant={variant ? variant : "body2"}>{text}</Typography>
    </div>
  );
};

export default CheckCircleText;
