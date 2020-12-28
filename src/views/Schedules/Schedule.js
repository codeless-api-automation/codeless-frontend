import React from "react";

import ScheduleForm from "./ScheduleForm";

import {
    Paper,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}))

export default function Schedule() {

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}>
            <ScheduleForm />
        </Paper>
    );
}