import React from "react";
import { connect } from "react-redux";
import {
    removeExtractor,
    updateValidatorInputField
} from "../../store/test-action"
import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import DeleteIcon from "@material-ui/icons/Delete";

import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: 200
        }
    }),
);

function ExtractorListItem({ extractor, removeExtractor, updateInputField }) {
    const classes = useStyles();
    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item>
                <Autocomplete
                    disabled
                    options={[extractor]}
                    getOptionLabel={(option) => option.displayName}
                    className={classes.root}
                    value={extractor}
                    renderInput={(params) => <TextField {...params} label="Context extractor" variant="outlined" />}
                />
            </Grid>

            {extractor !== null && extractor['inputFields'] && extractor.inputFields.map((inputField) => (
                <Grid item
                    key={inputField.displayName}>
                    <TextField
                        label={inputField.displayName}
                        variant="outlined"
                        className={classes.root}
                        fullWidth={true}
                        inputProps={{
                            defaultValue: inputField.value,
                            onBlur: event => updateValidatorInputField(extractor, inputField, event.target.value)
                        }}
                    />
                </Grid>
            ))}

            <Grid item style={{display: "flex", alignItems: "center"}}>
                <IconButton onClick={() => removeExtractor(extractor)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = () => ({

});
export default connect(mapStateToProps, { removeExtractor, updateValidatorInputField })(ExtractorListItem);  