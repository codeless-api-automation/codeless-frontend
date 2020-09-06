import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100%",
        display: "block",
        overflow: "hidden"
    }
}));

export default function OverflowTextContainer(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.text}
        </div>

    );
}