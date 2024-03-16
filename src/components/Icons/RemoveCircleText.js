import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(0.25)
  },
}));

const RemoveCircleText = ({ text, variant }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RemoveCircleOutlineIcon fontSize='small' className={classes.icon} />
      <Typography variant={variant ? variant : "body2"}>{text}</Typography>
    </div>
  );
};

export default RemoveCircleText;
