import React, { useState } from 'react';
import {
    buildRegion
} from "utils/Formatter"

import {
    TextField
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Region from './Region.js';

export default function GeolocationSelect(props) {

    const { regionShownByDefault, regions, onChange, autocompleteParams, textFieldParams } = props;

    const [region, setRegion] = useState(regionShownByDefault);

    const onChangeInternal = newValue => {
        setRegion(newValue);
        onChange(convertToDefEventPara(autocompleteParams.name, newValue));
    };

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <Autocomplete
            {...autocompleteParams}
            options={regions}
            disableClearable
            getOptionLabel={(option) => buildRegion(option)}
            renderOption={(option) => (<Region region={option} />)}
            value={region}
            onChange={(event, newValue) => onChangeInternal(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Geolocation"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps
                    }}
                    {...textFieldParams}
                />
            )}
        />
    );
}