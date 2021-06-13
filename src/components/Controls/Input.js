import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, error = null, onChange, onBlur, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
